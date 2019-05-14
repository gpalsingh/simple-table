export const getSubjectById = (subjects, id) => (
  subjects.find(subject => subject.id === id)
);

export const getSubjectNames = (subjects) => (
  subjects.map(subject_info => subject_info["name"])
);

export const getSubjectNamesAndIds = (subjects) => {
  let id_to_sub_name = {};

  for (let subject of subjects) {
    id_to_sub_name[subject['id']] = subject['name'];
  }

  return id_to_sub_name;
}