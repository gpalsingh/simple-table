export const getSubjectById = (subjects, id) => (
  subjects.find(subject => subject.id === id)
);

export const getSubjectNames = (subjects) => (
  subjects.map(subject_info => subject_info["name"])
);

export const getSubjectNamesAndIds = (subjects) => {
  let id_and_sub_name = [];

  for (let subject of subjects) {
    id_and_sub_name.push([subject['id'], subject['name']]);
  }

  return id_and_sub_name;
}

export const sortSubjectsByName = (subjects) => {
  const subCompareFunc = (firstSub, secondSub) => {
    const isGreater = firstSub.name.toLowerCase() > secondSub.name.toLowerCase();
    if (isGreater) return 1;
    return -1;
  };

  return [...subjects].sort(subCompareFunc);
}