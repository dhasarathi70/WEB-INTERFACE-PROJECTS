const gradePoints = {
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  "C+": 6,
  C: 5,
  F: 0,
};

export function calculateSGPA(subjects) {
  let totalPoints = 0;
  let totalCredits = 0;

  subjects.forEach((subject) => {
    const points = gradePoints[subject.grade] ?? 0;

    if (subject.credits > 0) {
      totalPoints += points * subject.credits;
      totalCredits += subject.credits;
    }
  });

  if (totalCredits === 0) {
    return "0.00";
  }

  return (totalPoints / totalCredits).toFixed(2);
}

export function calculateTotalCredits(subjects) {
  return subjects.reduce(
    (total, subject) => total + subject.credits,
    0
  );
}

export function calculateCGPA(semesters) {
  let totalPoints = 0;
  let totalCredits = 0;

  Object.values(semesters).forEach((semester) => {
    semester.subjects.forEach((subject) => {
      const points = gradePoints[subject.grade] ?? 0;

      if (subject.credits > 0) {
        totalPoints += points * subject.credits;
        totalCredits += subject.credits;
      }
    });
  });

  if (totalCredits === 0) {
    return "0.00";
  }

  return (totalPoints / totalCredits).toFixed(2);
}