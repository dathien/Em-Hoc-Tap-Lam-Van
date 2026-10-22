import { Student, GradeLevel, SubmissionStatus } from '../types';

const lastNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý"];
const middleBoys = ["Văn", "Đức", "Minh", "Quốc", "Gia", "Bảo", "Tuấn", "Hải", "Khánh", "Thành", "Duy"];
const middleGirls = ["Thị", "Ngọc", "Mai", "Phương", "Thu", "Khánh", "Hải", "Như", "Thanh", "Bích", "Yến"];
const firstNamesBoys = ["An", "Bình", "Cường", "Dũng", "Đạt", "Hiếu", "Huy", "Hưng", "Khang", "Khoa", "Kiên", "Long", "Nam", "Nghĩa", "Nhật", "Phong", "Phúc", "Quân", "Quang", "Sơn", "Tâm", "Thắng", "Thịnh", "Tiến", "Tùng", "Việt"];
const firstNamesGirls = ["Anh", "Chi", "Diệp", "Dung", "Hà", "Hân", "Hằng", "Hoa", "Hương", "Huyền", "Linh", "Ly", "Mai", "My", "Nga", "Ngân", "Nhi", "Nhung", "Oanh", "Phương", "Quỳnh", "Thảo", "Trang", "Trâm", "Tú", "Uyên", "Vy"];

const statuses: SubmissionStatus[] = [
  'da_cham',
  'da_nop',
  'dang_viet',
  'dang_lap_dan_y',
  'dang_tim_y',
  'can_giup_do'
];

function generate175Students(): Student[] {
  const students: Student[] = [];
  const classes: { name: string; grade: GradeLevel }[] = [
    { name: "1A", grade: 1 },
    { name: "2A", grade: 2 },
    { name: "3A", grade: 3 },
    { name: "4A", grade: 4 },
    { name: "5A", grade: 5 },
  ];

  classes.forEach((cls) => {
    for (let i = 1; i <= 35; i++) {
      const isHocSinh01 = cls.name === "3A" && i === 1;
      const isGirl = isHocSinh01 ? true : (i % 2 === 0);
      const gender = isGirl ? 'nu' : 'nam';
      
      let name = "";
      let username = "";
      let parentName = "";
      
      if (isHocSinh01) {
        name = "Lê Mai Anh";
        username = "hocsinh01";
        parentName = "Nguyễn Thanh Thảo";
      } else {
        const lName = lastNames[(i + cls.grade * 3) % lastNames.length];
        const mName = isGirl 
          ? middleGirls[(i + cls.grade) % middleGirls.length]
          : middleBoys[(i + cls.grade) % middleBoys.length];
        const fName = isGirl
          ? firstNamesGirls[(i * 3 + cls.grade) % firstNamesGirls.length]
          : firstNamesBoys[(i * 2 + cls.grade) % firstNamesBoys.length];
        
        name = `${lName} ${mName} ${fName}`;
        username = `hs_${cls.name.toLowerCase()}_${String(i).padStart(2, '0')}`;
        parentName = `Phụ huynh ${name}`;
      }

      const id = `HS-${cls.name}-${String(i).padStart(2, '0')}`;
      const status = isHocSinh01 
        ? 'da_cham' 
        : statuses[(i + cls.grade) % statuses.length];
      
      const averageScore = Number((7.0 + ((i * 7 + cls.grade * 3) % 29) / 10).toFixed(1));
      const completedCount = 2 + (i % 8);

      students.push({
        id,
        name,
        grade: cls.grade,
        className: cls.name,
        username,
        gender,
        avatar: isGirl ? '👧' : '👦',
        parentId: isHocSinh01 ? 'phuhuynh01' : `PH-${id}`,
        parentName,
        status,
        currentEssayTitle: cls.grade === 3 
          ? "Tả chú mèo mướp sưởi nắng bên thềm" 
          : (cls.grade === 5 ? "Tả người mẹ thân yêu đang chăm sóc gia đình" : "Kể về một ngày chủ nhật ý nghĩa"),
        averageScore: averageScore > 10 ? 9.2 : averageScore,
        completedCount
      });
    }
  });

  return students;
}

export const MOCK_STUDENTS: Student[] = generate175Students();
