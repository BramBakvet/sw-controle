
export function checkStatus(krijgsmacht: string | undefined, rank: string | undefined, id: string | undefined, departments: any[], status: string): boolean {
  let check = false; // Initialize check variable

  const updatedDepartments = departments.map((department) => {
    // Commando Strijdkrachten
    if (department === 'Commandant der Strijdkrachten') {
      return 'CDS';
    }

    // Commando Zeestrijdkrachten (C-ZSK)
    if (department === 'Commandant der Zeestrijdkrachten') {
      return 'CZSK';
    }
    if (department === 'Officierschef CZSK') {
      return 'OFCZSK';
    }
    if (department === 'Onderofficierschef CZSK') {
      return 'ORCZSK';
    }
    if (department === 'Commandolid CZSK') {
      return 'C-ZSK';
    }
    // Commando Landstrijdkrachten (CLAS)
    if (department === 'Commandant der Landstrijdkrachten') {
      return 'CLAS';
    }
    if (department === 'Officierschef CLAS') {
      return 'OFCLAS';
    }
    if (department === 'Onderofficierschef CLAS') {
      return 'ORCLAS';
    }
    if (department === 'Commandolid CLAS') {
      return 'C-LAS';
    }
    // Commando Luchtstrijdkrachten ()
    if (department === 'Commandant der Luchtstrijdkrachten') {
      return 'CLSK';
    }
    if (department === 'Officierschef CLSK') {
      return 'OFCLSK';
    }
    if (department === 'Onderofficierschef CLSK') {
      return 'ORCLSK';
    }
    if (department === 'Commandolid CLSK') {
      return 'C-LSK';
    }
    // Commando Koninklijke Marechaussee
    if (department === 'Commandant Koninklijke Marechaussee') {
      return 'CKMar';
    }

    // KorpsMA
    if (department === 'Korpscommandant Korps Militaire Administratie') {
      return 'KC KorpsMA';
    }
    if (department === 'Plv. Korpscommandant Korps Militaire Administratie') {
      return 'PKC KorpsMA';
    }
    if (department === 'Korpsadjudant Administratie') {
      return 'SKorpsMA';
    }

    // DCWS
    if (department === 'Directeur Dienstencentrum Werving & Selectie') {
      return 'DDCWS';
    }
    if (department === 'Plv. Directeur Dienstencentrum Werving & Selectie') {
      return 'PDDCWS';
    }

    // MIVD
    if (department === 'Directeur Militaire Inlichtingen- en Veiligheidsdienst') {
      return 'DMIVD';
    }
    if (department === 'Plv. Militaire Inlichtingen- en Veiligheidsdienst') {
      return 'PDMIVD';
    }

    // SOPS
    if (department === 'Commandant Sectie Operaties') {
      return 'CSOPS';
    }
    if (department === 'Plv. Commandant Sectie Operaties') {
      return 'PCSOPS';
    }

    // NLDA
    if (department === 'Directeur Nederlandse Defensie Academie') {
      return 'DNLDA';
    }
    if (department === 'Plv. Directeur Nederlandse Defensie Academie') {
      return 'PDNLDA';
    }
    if (department === 'Professor') {
      return 'NLDAP';
    }
    if (department === 'Docent') {
      return 'NLDAD';
    }

    // OVD
    if (department === 'Commandant Operationele Verbindingsdienst') {
      return 'COVD';
    }
    if (department === 'Plv. Commandant Operationele Verbindingsdienst') {
      return 'PCOVD';
    }

    // GGJ
    if (department === 'Regimentscommandant Garderegiment Grenadiers & Jagers') {
      return 'RC GGJ';
    }
    if (department === 'Plv. Regimentscommandant Garderegiment Grenadiers en Jagers') {
      return 'PRC GGJ';
    }

    // MJD
    if (department === 'Directeur Juridische Zaken') {
      return 'DJZ';
    }
    if (department === 'Plv. Directeur Juridische Zaken') {
      return 'PDJZ';
    }

    // AIB
    if (department === 'Directeur Afdeling Internationale Betrekkingen') {
      return 'DAIB';
    }
    if (department === 'Plv. Directeur Afdeling Internationale Betrekkingen') {
      return 'PDAIB';
    }

    // DMO
    if (department === 'Directeur Defensie Materieel Organisatie') {
      return 'DDMO';
    }
    if (department === 'Plv. Directeur Defensie Materieel Organisatie') {
      return 'PDDMO';
    }

    // DCC
    if (department === 'Directeur Defensie Cyber Commando') {
      return 'DDCC';
    }
    if (department === 'Plv. Directeur Defensie Cyber Commando') {
      return 'PDDCC';
    }
    return department;
  });

  const updatedDepartmentsSet = new Set(updatedDepartments);
  const updatedDepartmentsWithoutDuplicates = Array.from(updatedDepartmentsSet);
  
  // Check for Veteran
  if(departments.includes("VI")){
    return true;
  }

  if (!Array.isArray(departments) || departments.length === 0) {
    return (status === `${krijgsmacht} - ${rank}`);
  } else {
    const permutations = generatePermutations(updatedDepartmentsWithoutDuplicates);
    const result: string[] = [];
      
    for (const permutation of permutations) {
      const departmentString = permutation.join('/');
      const statusString = `${krijgsmacht} - ${rank}/${departmentString}`;
        
      result.push(statusString);
    }

    return check = result.some((statusString) => statusString === status);
  }
}
  
  // Helper function to generate all permutations of an array
  function generatePermutations<T>(arr: T[]): T[][] {
    const result: T[][] = [];
  
    function permute(nums: T[], start: number): void {
      if (start === nums.length - 1) {
        result.push([...nums]);
        return;
      }
  
      for (let i = start; i < nums.length; i++) {
        swap(nums, start, i);
        permute(nums, start + 1);
        swap(nums, start, i);
      }
    }
  
    permute(arr, 0);
    return result;
  }
  
  // Helper function to swap elements in an array
  function swap<T>(arr: T[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

export function checkBrevetten(content: string[]): boolean {
  return true;
}

export function checkSkinColor(): boolean {
  return true;
}

export function checkMedaille(caCode: string, awardings: string[]): boolean {
  let medaille: string = '';

  if(caCode === "ca-3425-66-82" || caCode === "ca-3425-1321-82"){
    medaille = "Ridder 3e klasse in de Militaire Willems-Orde";
  }
  if(caCode === "ca-3425-1408-82" || caCode === "ca-3425-92-82"){
    medaille = "Ridder 4e klasse in de Militaire Willems-Orde";
  }
  if(caCode === "ca-3425-66-84" || caCode === "ca-3425-1321-84"){
    medaille = "Eresabel";
  }
  if(caCode === "ca-3424-66-82" || caCode === "ca-3424-1321-82"){
    medaille = "Ridder in de Orde van de Nederlandse Leeuw";
  }
  if(caCode === "ca-3412-73"){
    medaille = "Vaardigheidsmedaille (KMA)";
  }
  if(caCode === "ca-3410-73"){
    medaille = "Vaardigheidsmedaille (KMS)";
  }
  if(caCode === "ca-3414-81"){
    medaille = "Parawing, Brevet A";
  }
  if(caCode === "ca-3414-82"){
    medaille = "Parawing, Brevet B";
  }
  if(caCode === "ca-3414-72"){
    medaille = "Parawing, Brevet C";
  }
  if(caCode === "ca-3414-73"){
    medaille = "Parawing, Brevet D";
  }
  if(caCode === "ca-3423-66-88" || caCode === "ca-3423-1321-88" ){
    medaille = "Landmachtmedaille";
  }
  if(caCode === "ca-3423-66-1408" || caCode === "ca-3423-1321-1408"){
    medaille = "Marinemedaille";
  }
  if(caCode === "ca-3423-66-64" || caCode === "ca-3423-1321-64"){
    medaille = "Luchtmachtmedaille";
  }
  if(caCode === "ca-3423-66-82" || caCode === "ca-3423-1321-82"){
    medaille = "Marechausseemedaille";
  }

  // Trouwe Dienst Zilver
  if(caCode === "ca-3410-1408"){
    return (awardings.reduce((count, element) => (element === "Trouwe Dienst Medaille (Zilver)" ? count + 1 : count), 0) === 1);
  }
  // 2 TIMES
  if(caCode === "ca-3411-1408"){
    return (awardings.reduce((count, element) => (element === "Trouwe Dienst Medaille (Zilver)" ? count + 1 : count), 0) === 2);
  }
  // 3 TIMES
  if(caCode === "ca-3412-1408"){
      return (awardings.reduce((count, element) => (element === "Trouwe Dienst Medaille (Zilver)" ? count + 1 : count), 0) === 3);
  }

  if(caCode === "ca-3412-66"){
    medaille = "Trouwe Dienst Medaille (Goud)";
  }
  if(caCode === "ca-3423-90-66"){
    medaille = "Bronzen Kruis";
  }

  // Ereteken voor Verdienste
  if(caCode === "ca-3424-1408-72" || caCode === "ca-3424-92-72"){
    return (awardings.reduce((count, element) => (element === "Ereteken voor Verdienste" ? count + 1 : count), 0) === 1);
  }
  // 2 TIMES
  if(caCode === "ca-3424-66-72" || caCode === "ca-3424-1321-72"){
    return (awardings.reduce((count, element) => (element === "Ereteken voor Verdienste" ? count + 1 : count), 0) === 2);
  }

  if(caCode === "ca-3410-64"){
    medaille = "Grenadiersinsigne I";
  }
  if(caCode === "ca-3411-64"){
    medaille = "Grenadiersinsigne II";
  }
  if(caCode === "ca-3412-64"){
    medaille = "Grenadiersinsigne III";
  }

  if(caCode === "ca-3414-91"){
    medaille = "Bronzen Instructeursinsigne (Brevet)";
  }
  if(caCode === "ca-3414-1408" || caCode === "ca-3414-92"){
    medaille = "Zilveren Instructeursinsigne (Brevet)";
  }
  if(caCode === "ca-3412-66" || caCode === "ca-3414-1321"){
    medaille = "Gouden Instructeursinsigne (Brevet)";
  }
  if(caCode === "ca-3423-90-1408"){
    medaille = "Erkentelijkheidsmedaille";
  }
  if(caCode === "ca-3423-90-81"){ 
    medaille = "Kruis van Verdienste";
  }
  if(caCode === "ca-3413-81"){ 
    medaille = "Instructeursinsigne (Amusement)";
  }
  if(caCode === "ca-3413-1320"){ 
    medaille = "Instructeursinsigne (Gevecht)";
  }
  if(caCode === "ca-3413-81"){ 
    medaille = "Instructeursinsigne (Exercitie)";
  }
  if(caCode === "ca-3414-83"){ 
    medaille = "Duikersinsigne";
  }

  // Eervolle vermelding voor dienst
  if(caCode === "ca-3410-72"){
    return (awardings.reduce((count, element) => (element === "Eervolle Vermelding voor Dienst" ? count + 1 : count), 0) === 1);
  }
  // 2 TIMES
  if(caCode === "ca-3411-72"){
    return (awardings.reduce((count, element) => (element === "Eervolle Vermelding voor Dienst" ? count + 1 : count), 0) === 2);
  }
  // 3 TIMES
  if(caCode === "ca-3412-72"){
      return (awardings.reduce((count, element) => (element === "Eervolle Vermelding voor Dienst" ? count + 1 : count), 0) === 3);
  }

  return awardings.includes(medaille)
}
  
  