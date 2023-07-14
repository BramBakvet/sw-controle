import React, { useEffect, useState } from 'react';
import Box from './Box';
import HabboFigure from './HabboFigure';
import { getDepartmentProps, getServerSideProps, getQualificationsProps, getAwardingsProps } from '@/app/api/HabboDefensieAPI';
import { checkBrevetten, checkSkinColor, checkStatus } from '@/app/personeel/check';
import { setAwardings } from '@/awardingsUtil';

type Props = {
  searchValue: string;
};

function Person({ searchValue }: Props) {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [rank, setRank] = useState<string>('');
  const [krijgsmacht, setKrijgsmacht] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [isAdel, setIsAdel] = useState<boolean>(false);
  const [departments, setDepartments] = useState<string[]>([]);

  const searchApiUrl = `https://www.habbo.nl/api/public/users?name=${searchValue}`;

  useEffect(() => {
    // Reset all states when searchValue changes
    setName('');
    setStatus('');
    setRank('');
    setKrijgsmacht('');
    setDepartments([]);
    setIsAdel(false);

    getServerSideProps(searchValue)
      .then((data) => {
        const member = data.props.member;
        if (member) {
          const rank = member.members[0].rank.abbr;
          setRank(rank);
          const id = member.members[0].id;
          setId(id);
        } else {
          console.error('Error: Invalid member data');
        }
      })
      .catch((error) => {
        console.error('Error fetching member:', error);
      });

      getAwardingsProps(id)
      .then((data) => {
        const awardings = data.props.awardings;
        const awardingNames = awardings ? awardings.map((element: { award: { name: any; }; }) => element.award.name) : [];
        setAwardings(awardingNames);
      })
      .catch((error) => {
        console.error('Error fetching awardings:', error);
      });
  }, [searchValue]);

  useEffect(() => {
    getDepartmentProps(id).then((data) => {
      const member = data.props.member;
      let hasNullEndDate = false;
      const departments: string[] = [];
      const existingDepartments: string[] = [];

      if (member && member.assignments) {
        member.assignments.forEach((element: any) => {
          if (element.end_date === null) {
            if (element.unit.abbr === 'VI' || element.unit.abbr === 'Adel') {
              setIsAdel(true);
              return;
            }
            if (element.unit.abbr !== 'VI' || element.unit.abbr !== 'Adel') {
              hasNullEndDate = true;
            }
            if (['KM', 'KL', 'KLu', 'KMar'].includes(element.unit.abbr)) {
              setKrijgsmacht(element.unit.abbr); // Update the krijgsmacht state
            } else {
              if(element.position.name === 'MDU Speler' || element.position.name === 'Senior Admin' || element.position.name === 'MDU Staff'){
                return;
              }
              else if(element.position.name === 'Officierschef' || element.position.name === 'Onderofficierschef' || element.position.name === 'Commandolid') {
                departments.push(`${element.position.name} ${element.unit.abbr}`);
                return;
              }
              else if (
                (element.position.name === 'Stafchef' ||
                  element.position.name === 'Groepscommandant Infanteristen en Specialisten' ||
                  element.position.name === 'Traineecoördinator' ||
                  element.position.name === 'Groepscommandant Trainingen' ||
                  element.position.name === 'Coördinator Wetenschappelijk Onderwijs' ||
                  element.position.name === 'Coördinator Onderofficiersopleidingen' ||
                  element.position.name === 'Coördinator Onderwijszorg' ||
                  element.position.name === 'Coördinator Basisopleidingen' ||
                  element.position.name === 'Hoofdredacteur' ||
                  element.position.name === 'Coördinator Amusement' ||
                  element.position.name === 'Coördinator Vormgeving' ||
                  element.position.name === 'Pelotonsadjudant' ||
                  element.position.name === 'Trainee Coördinator' ||
                  element.position.name === 'Coördinator Trainingscentrum' ||
                  element.position.name === 'Teamcoördinator') 
              ) {
                departments.push(`S${element.unit.abbr}`)
                existingDepartments.push(`S${element.unit.abbr}`)
                return;
              }
              else if (element.position.name === 'Lid' || element.position.name === 'Specialist' || element.position.name === 'Infanterist' || element.position.name === 'Trainee'
              || element.position.name === 'Redacteur' || element.position.name === 'Organisator' || element.position.name === 'Vormgever' || element.position.name === 'Redacteur in opleiding'
              || element.position.name === ' Organisator in opleiding' || element.position.name === 'Vormgever in opleiding' ||  element.position.name === 'Inspecteur' 
              || element.position.name === 'Handelaar in opleiding' || element.position.name === 'Student Bouwkunde' || element.position.name === 'Militair Jurist' || element.position.name === 'Militair Juridisch Officier'
              || element.position.name === 'Leerling' || element.position.name === 'Diplomaat' || element.position.name === 'Ambassadeur' || element.position.name === 'Administrateur'
              || element.position.name === 'Hoogleraar') {
                if(existingDepartments.includes(`S${element.unit.abbr}`)){
                  return;
                } else {
                  departments.push(element.unit.abbr);
                  existingDepartments.push(element.unit.abbr);
                } 
              } 
              else {
                departments.push(element.position.name);
              }
            }
          } else if (element.unit.abbr === 'VI' || element.unit.abbr === 'Adel') {
            setIsAdel(true);
          }
        });
  
        if (hasNullEndDate) {
          setIsAdel(false);
        }
      }
      setDepartments(departments); // Update the departments state with the filtered array of unit abbreviations
    });
  }, [id]);

  useEffect(() => {
    fetch(searchApiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Process the user data returned from the API
        setName(data.name);
        setStatus(data.motto);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch request
        console.error('Error:', error);
      });
  }, [searchApiUrl]);

  const regex = /{.*}/g;
  const cleanStatus = (status ?? '').replace(regex, '').trim();

  let isCorrectStatus: boolean = checkStatus(krijgsmacht, rank, id, departments, cleanStatus);

  // // Regular expression to match content inside brackets
  // const regexBrevetten = /{([^}]+)}/g;

  // // Array to store the extracted content
  // const extractedContent: string[] = [];

  // let match;
  // while ((match = regexBrevetten.exec(status)) !== null) {
  //   const content = match[1]; // Extracted content inside brackets
  //   extractedContent.push(content);
  // }
  // let areCorrectBrevetten: boolean = checkBrevetten(extractedContent);

  const boxClassName = `bg-neutral-800 m-10 ${isCorrectStatus || isAdel ? 'bg-green-500' : 'bg-red-500'}`;

  return (
    <div className="flex flex-row gap-4">
      <Box className="bg-neutral-800 m-10">
        <div className="flex justify-center items-center">
          <HabboFigure username={searchValue} />
        </div>
      </Box>
      <Box className={boxClassName}>
        <div>
          <div className="text-xl font-bold p-5">{name}</div>
          <div className="p-5 bg-white rounded-md text-black m-5 flex font-bold">Status: {status}</div>
        </div>
      </Box>
    </div>
  );
}

export default Person;
