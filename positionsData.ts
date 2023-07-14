export const specialPositions = [
    {
      names: ['Officierschef', 'Onderofficierschef', 'Commandolid'],
      condition: (element: { position: { name: any; }; unit: { abbr: any; }; }) => {
        return `${element.position.name} ${element.unit.abbr}`;
      },
    },
    {
      names: [
        'Stafchef',
        'Groepscommandant Infanteristen en Specialisten',
        'Traineecoördinator',
        'Groepscommandant Trainingen',
        'Coördinator Wetenschappelijk Onderwijs',
        'Coördinator Onderofficiersopleidingen',
        'Coördinator Onderwijszorg',
        'Coördinator Basisopleidingen',
        'Hoofdredacteur',
        'Coördinator Amusement',
        'Coördinator Vormgeving',
        'Pelotonsadjudant',
        'Trainee Coördinator',
        'Coördinator Trainingscentrum',
        'Teamcoördinator',
        // ... other position names
      ],
      condition: (element: { unit: { abbr: any; }; }) => {
        return `S${element.unit.abbr}`;
      },
    },
    // ... other special positions
  ];
  
  
export const excludedPositions = ['MDU Speler', 'Senior Admin', 'MDU Staff'];
  
export const allowedPositions = [
    'Lid',
    'Specialist',
    'Infanterist',
    'Trainee',
    'Redacteur',
    'Organisator',
    'Vormgever',
    'Redacteur in opleiding',
    'Organisator in opleiding',
    'Vormgever in opleiding',
    'Inspecteur',
    'Handelaar in opleiding',
    'Student Bouwkunde',
    'Militair Jurist',
    'Militair Juridisch Officier',
    'Leerling',
    'Diplomaat',
    'Ambassadeur',
    'Administrateur',
    'Hoogleraar',
];
  