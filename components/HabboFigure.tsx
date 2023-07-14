import { useEffect, useState } from "react";
import { getServerSideProps } from "@/app/api/HabboDefensieAPI";
import { RiCloseCircleLine } from "react-icons/ri";
import { getAwardings } from "@/awardingsUtil";
import { checkMedaille } from "@/app/personeel/check";

type Props = {
  username: string;
};

type HabboFigureData = {
  figureString: string;
};

const HabboFigure = ({ username }: Props) => {
  const [figureApiUrls, setFigureApiUrls] = useState<string[]>([]);
  const invalidSkinColors: string | string[] = [
    "13",
    "14",
    "15",
    "17",
    "18",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "1357",
    "1360",
    "1361",
    "1362",
    "1363",
    "1364",
    "1365",
    "1366",
    "1367",
    "1368",
    "1369",
    "1374",
    "1376",
    "1377",
    "1378",
    "1381",
    "1382",
    "1384",
    "1392",
    "1393"
    // invalid skin colors
  ];

  const invalidHairColors: string | string[] = [
    "50",
    "51",
    "55",
    "57",
    "59",
    "60",
    "1345",
    "1348",
    "1399",
    "1316",
    "1406"
    // invalid hair colors
  ];
  const [invalidIndices, setInvalidIndices] = useState<number[]>([]);

  const [invalidHairColor, setInvalidHairColor] = useState('');
  const [invalidSkinColor, setInvalidSkinColor] = useState('');

  useEffect(() => {
    const searchApiUrl = `https://www.habbo.nl/api/public/users?name=${username}`;

    setInvalidHairColor('');
    setInvalidSkinColor('');

    fetch(searchApiUrl)
      .then((response) => response.json())
      .then((data: HabboFigureData) => {
        const figureString = data.figureString || "";
        const figureUrls = parseFigureString(figureString);
        setFigureApiUrls(figureUrls);

        const invalidIndices = figureUrls.reduce<number[]>((indices, _, index) => {
          const part = figureString.split(".")[index]?.trim();
          const lastNumber = part?.split("-").slice(-1)[0];
          const isSkinColorInvalid = lastNumber && invalidSkinColors.includes(lastNumber);
          const isHairInvalid = index === 0 && lastNumber && invalidHairColors.includes(lastNumber);

          if (isHairInvalid) {
            setInvalidHairColor(`Haircolor ${lastNumber} is not allowed!`);
          }

          if (isSkinColorInvalid) {
            setInvalidSkinColor('The skin color is invalid');
          }

          if (part?.startsWith("ca")) {
            const caCode = part;
            const isMedailleValid = checkMedailleValidity(caCode);

            if (!isMedailleValid) {
              return [...indices, index];
            }
          }

          return indices;
        }, []);

        setInvalidIndices(invalidIndices);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [username]);

  const parseFigureString = (figureString: string): string[] => {
    const parts = figureString.split(".");
    const figureUrls: string[] = [];

    parts.forEach((part) => {
      figureUrls.push(
        `https://www.habbo.nl/habbo-imaging/avatarimage?figure=${part}&action=std`
      );
    });

    return figureUrls;
  };

  const checkMedailleValidity = (caCode: string) => {
    const awardings = getAwardings();
    console.log(awardings);
    console.log(caCode);

    const isMedailleValid = checkMedaille(caCode, awardings || []);

    return isMedailleValid;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center items-center">
        {figureApiUrls.map((imageUrl, index) => (
          <div key={index} className="relative">
            <img
              height="200px"
              width="200px"
              src={imageUrl}
              alt={`Part ${index + 1}`}
              className={invalidIndices.includes(index) ? "bg-red-500" : ""}
            />
            {index === 0 && invalidIndices.includes(index) && (
              <div className="absolute bottom-0 left-0">
                <RiCloseCircleLine
                  size={20}
                  color="red"
                  style={{ position: "relative", bottom: "-20px", left: "15px" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center mt-8 px-5">
        <div className="font-bold text-lg text-red-400">{invalidHairColor}</div>
        <div className="font-bold text-lg text-red-400">{invalidSkinColor}</div>
      </div>
    </div>
  );
};

export default HabboFigure;
