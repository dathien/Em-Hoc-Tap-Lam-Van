import { PromptItem, GradeLevel, EssayCategory } from '../types';

interface PromptSeed {
  title: string;
  topic: string;
  category: EssayCategory;
  requirement: string;
  difficulty: 'Cơ bản' | 'Mở rộng' | 'Sáng tạo';
  lengthSuggestion: string;
  languageRequirements: string[];
  brainstormQuestions: string[];
  rubric: { criteria: string; points: number }[];
}

// 50 realistic prompts for Grade 1
const grade1Seeds: PromptSeed[] = [
  {
    title: "Giới thiệu về bản thân em",
    topic: "Bản thân em",
    category: "Giới thiệu",
    requirement: "Nói và viết 2 - 3 câu giới thiệu tên, tuổi và sở thích của em để làm quen với các bạn.",
    difficulty: "Cơ bản",
    lengthSuggestion: "2 - 3 câu",
    languageRequirements: ["Viết hoa chữ cái đầu câu", "Cuối câu có dấu chấm"],
    brainstormQuestions: ["Em tên là gì và năm nay mấy tuổi?", "Em có sở thích gì đặc biệt (vẽ tranh, đá bóng, đọc truyện)?", "Em muốn nhắn gửi điều gì với các bạn mới?"],
    rubric: [{ criteria: "Giới thiệu đúng tên, tuổi", points: 4 }, { criteria: "Câu văn rõ ràng, có dấu chấm câu", points: 4 }, { criteria: "Trình bày sạch đẹp", points: 2 }]
  },
  {
    title: "Tả chiếc bút chì thân thiết của em",
    topic: "Đồ dùng học tập",
    category: "Miêu tả",
    requirement: "Viết 2 - 3 câu kể về chiếc bút chì giúp em tập viết những nét chữ đầu tiên.",
    difficulty: "Cơ bản",
    lengthSuggestion: "2 - 3 câu",
    languageRequirements: ["Dùng từ chỉ màu sắc hoặc hình dáng"],
    brainstormQuestions: ["Chiếc bút chì của em màu gì, dài khoảng bao nhiêu?", "Đầu bút và tẩy của bút trông như thế nào?", "Em dùng bút chì để làm gì mỗi ngày?"],
    rubric: [{ criteria: "Nêu được đặc điểm chiếc bút", points: 4 }, { criteria: "Viết câu đủ ý", points: 4 }, { criteria: "Dùng từ sinh động", points: 2 }]
  },
  {
    title: "Kể về một người thân yêu nhất trong nhà",
    topic: "Gia đình yêu thương",
    category: "Nêu tình cảm, cảm xúc",
    requirement: "Viết 2 - 3 câu nói về người thân (bố, mẹ, ông hoặc bà) và tình cảm của em đối với người đó.",
    difficulty: "Cơ bản",
    lengthSuggestion: "2 - 3 câu",
    languageRequirements: ["Dùng từ thể hiện tình cảm"],
    brainstormQuestions: ["Người em muốn kể là ai?", "Người đó thường chăm sóc em như thế nào?", "Em có tình cảm gì đối với người đó?"],
    rubric: [{ criteria: "Nêu đúng người thân", points: 4 }, { criteria: "Bày tỏ tình cảm chân thật", points: 4 }, { criteria: "Chính tả sạch sẽ", points: 2 }]
  },
  {
    title: "Chú mèo con đáng yêu của nhà em",
    topic: "Thế giới động vật",
    category: "Miêu tả",
    requirement: "Viết 2 - 3 câu nói về bộ lông, đôi mắt hoặc thói quen đáng yêu của chú mèo.",
    difficulty: "Cơ bản",
    lengthSuggestion: "2 - 3 câu",
    languageRequirements: ["Từ ngữ miêu tả hình ảnh"],
    brainstormQuestions: ["Chú mèo có tên là gì, lông màu gì?", "Đôi mắt và tiếng kêu của chú ra sao?", "Chú thích làm gì nhất (sưởi nắng, cuộn tròn)?"],
    rubric: [{ criteria: "Tả được nét nổi bật của chú mèo", points: 4 }, { criteria: "Câu văn liền mạch", points: 4 }, { criteria: "Sáng tạo", points: 2 }]
  },
  {
    title: "Cây hoa hồng trong vườn nhà em",
    topic: "Cây cối quanh em",
    category: "Miêu tả",
    requirement: "Viết 2 - 3 câu tả bông hoa hồng em nhìn thấy trong vườn hoặc ban công.",
    difficulty: "Cơ bản",
    lengthSuggestion: "2 - 3 câu",
    languageRequirements: ["Từ chỉ màu sắc, hương thơm"],
    brainstormQuestions: ["Bông hoa hồng nở màu gì?", "Cánh hoa và hương thơm thế nào?", "Em cảm thấy thế nào khi ngắm hoa?"],
    rubric: [{ criteria: "Quan sát được cánh hoa, màu sắc", points: 4 }, { criteria: "Viết đúng cấu trúc câu", points: 4 }, { criteria: "Cảm xúc tự nhiên", points: 2 }]
  }
];

// Generate 50 items for Grade 1
const grade1Titles = [
  "Giới thiệu hộp bút màu của em", "Cặp sách xinh xắn đến trường", "Đôi bàn tay ấm áp của mẹ", "Giờ ra chơi vui vẻ dưới sân trường",
  "Bữa cơm sum vầy bên gia đình", "Chú cún Vàng vẫy đuôi đón em", "Búp bê xinh em được tặng sinh nhật", "Chiếc xe đạp nhỏ màu xanh",
  "Nụ cười rạng rỡ của cô giáo em", "Cây bàng tỏa bóng mát sân trường", "Bình hoa cúc vàng rực rỡ ngày Tết", "Đàn gà con như những nắm bông vàng",
  "Ngôi nhà ấm cúng của em", "Chiếc thước kẻ thẳng tắp", "Cục tẩy trắng tinh giúp em xóa lỗi", "Quyển sách Tiếng Việt lớp 1 trang bìa rực rỡ",
  "Buổi sáng đón ánh nắng sớm mai", "Bầu trời xanh trong sau cơn mưa", "Em cùng mẹ tưới rau trong vườn", "Em giúp mẹ nhặt rau dọn cơm",
  "Ông nội ngồi đọc báo bên tách trà", "Bà kể chuyện cổ tích cho em nghe", "Bố dạy em tập đi xe đạp hai bánh", "Em và bạn cùng ghép tranh ghép hình",
  "Bảng lớp học màu xanh dịu mát", "Chú cá vàng bơi lội tung tăng trong bể", "Bông hoa hướng dương xòe cánh đón nắng", "Con đường làng rợp bóng tre xanh",
  "Cơn mưa rào đầu mùa hạ", "Cầu vồng bảy sắc sau cơn mưa", "Đêm trăng rằm tròn vành vạnh", "Em vẽ bức tranh tặng cô giáo",
  "Chiếc quạt mát xua tan ngày hè nóng", "Bác đồng hồ tích tắc báo thức mỗi sáng", "Cây ổi sau nhà ra quả thơm lừng", "Đôi dép quai hậu xinh xắn",
  "Chiếc nón lá trắng của mẹ đi chợ", "Đôi chim sẻ ríu rít trên cành cây", "Giờ học vẽ đầy màu sắc của lớp em", "Em tự gấp quần áo gọn gàng",
  "Bát canh mẹ nấu ngọt lành", "Chú thỏ trắng mắt hồng như hạt ngọc", "Bàn tay bé nhỏ của em bé sơ sinh", "Cây chuối trong vườn xòe tàu lá xanh mướt",
  "Đèn học tỏa ánh sáng dịu êm", "Bụi tre rì rào trong gió sớm"
];

// Grade 2 prompts
const grade2BaseTitles = [
  "Kể một việc tốt em đã làm ở trường", "Tả đồ dùng học tập em yêu quý nhất", "Kể lại một buổi sáng chuẩn bị đi học", "Tả chiếc đồng hồ báo thức",
  "Nói về một ngày chủ nhật ý nghĩa của em", "Kể về người bạn thân cùng bàn", "Tả cây bàng thay lá vào mùa xuân", "Kể lại chuyến đi chơi công viên thú vị",
  "Tả chú chó cưng trung thành của nhà em", "Viết đoạn văn ngắn về tình cảm với mẹ", "Tả cây hoa mai ngày Tết ở miền Nam", "Kể về một bữa ăn ấm cúng bên ông bà",
  "Tả chiếc cặp sách bố mua tặng em", "Kể về một lần em giúp đỡ bạn bị ngã", "Viết đoạn văn tả bầu trời vào buổi sớm mai", "Tả chú rùa nhỏ trong chậu nước",
  "Kể về một trò chơi dân gian em thích", "Tả cây phượng vĩ nở hoa đỏ rực", "Viết lời cảm ơn gửi đến cô giáo kính yêu", "Tả đèn ông sao đêm Trung thu",
  "Kể lại một lần em chăm sóc người thân ốm", "Tả chiếc áo ấm mẹ mua cho em mùa đông", "Kể về một buổi tập thể dục buổi sáng", "Tả cánh đồng lúa chín vàng óng",
  "Nói về ước mơ tương lai của em", "Tả con mèo mướp sưởi nắng bên thềm", "Kể về việc em tự giác học bài ở nhà", "Tả dòng sông quê em êm đềm chảy",
  "Viết tin nhắn cho bạn hẹn đi đá bóng", "Tả vườn rau xanh mướt của bà", "Kể về một lần em nhặt được của rơi trả lại", "Tả chú chim sâu nhảy nhót trên cành",
  "Kể về một bức tranh em tự tay vẽ", "Tả chiếc bàn học xinh xắn ở góc phòng", "Kể lại ngày đầu tiên em bước vào lớp 2", "Tả giàn mướp hoa vàng ong bướm bay lượn",
  "Kể về bác bảo vệ trường em luôn tươi cười", "Tả chiếc xe buýt chở học sinh", "Kể về buổi trực nhật lớp cùng các bạn", "Tả chú gà trống gáy vang gọi bình minh",
  "Viết lời chúc mừng sinh nhật gửi người bạn thân", "Tả chậu cây sen đá nhỏ trên bậu cửa sổ", "Kể về lần em cùng bố trồng cây xanh", "Tả chiếc ô che mưa nhiều màu sắc",
  "Kể về ngày hội đọc sách ở trường em", "Tả chiếc khăn quàng cổ ấm áp", "Kể về một người hàng xóm tốt bụng", "Tả quả dưa hấu mát ngọt ngày hè",
  "Viết đoạn văn bày tỏ lòng biết ơn chú bộ đội", "Tả chiếc bút máy rèn nét chữ nết người"
];

// Grade 3 prompts
const grade3BaseTitles = [
  "Kể lại một việc tốt em đã làm để bảo vệ môi trường", "Tả một đồ vật được làm từ tre hoặc gỗ thân thuộc", "Kể về một buổi lao động vệ sinh trường lớp",
  "Viết đoạn văn nêu tình cảm của em với quê hương", "Tả chú mèo mướp bắt chuột tài ba", "Kể lại một kỷ niệm đáng nhớ với thầy cô giáo",
  "Tả cây hoa phượng vĩ rực lửa sân trường hè về", "Viết thư gửi người bạn ở xa kể về năm học mới", "Nêu ý kiến của em về việc đọc sách mỗi ngày",
  "Tả chiếc máy tính em dùng học trực tuyến", "Kể về một ngày hội thể thao sôi nổi ở trường", "Tả cây chuối mẹ chuối con trong vườn nhà",
  "Viết đoạn văn giới thiệu về món ăn truyền thống quê em", "Tả người nông dân đang gặt lúa trên đồng", "Kể lại một giấc mơ kỳ thú của em",
  "Tả dòng sông quê hương trong một buổi chiều hoàng hôn", "Nêu cảm nghĩ về một câu chuyện cổ tích em yêu thích", "Tả chiếc áo dài duyên dáng của cô giáo",
  "Kể về một lần em mắc lỗi và dũng cảm nhận lỗi", "Tả chú cún bông tinh nghịch luôn quấn quýt bên em", "Viết đoạn văn 7-9 câu tả cảnh bình minh trên biển",
  "Kể về một việc em đã làm để giúp đỡ bố mẹ", "Tả vườn hoa công viên rực rỡ sắc màu mùa xuân", "Viết thư thăm hỏi sức khỏe ông bà ở quê",
  "Nêu ý kiến về việc trồng thêm cây xanh ở trường học", "Tả chiếc xe đạp nhỏ gắn bó cùng em tới trường", "Kể về buổi biểu diễn văn nghệ chào mừng 20-11",
  "Tả cây đa cổ thụ đầu làng tỏa bóng râm mát", "Viết đoạn văn tưởng tượng cuộc trò chuyện giữa Sách và Vở", "Tả chú gà trống oai vệ như chàng dũng sĩ",
  "Kể về một người lao động em thường gặp (cô lao công, bác thợ xây)", "Tả cảnh chợ quê ngày giáp Tết nhộn nhịp", "Viết đoạn văn nêu cảm xúc sau khi nghe một bài hát về mẹ",
  "Kể lại chuyến đi tham quan di tích lịch sử cùng lớp", "Tả cây bàng xòe tán lá như chiếc ô xanh khổng lồ", "Viết thư làm quen với một người bạn mới",
  "Nêu ý kiến về việc giữ gìn vệ sinh lớp học chung", "Tả chiếc đèn học thân thương soi sáng từng trang sách", "Kể lại một buổi cắm trại dã ngoại cùng gia đình",
  "Tả đàn chim én chao liệng báo hiệu mùa xuân sang", "Viết đoạn văn tả vẻ đẹp của một danh lam thắng cảnh đất nước", "Kể về một tấm gương học sinh nghèo vượt khó",
  "Tả cây mai vàng rực rỡ khoe sắc đón Tết", "Viết đoạn văn chia sẻ cảm xúc khi được nhận điểm tốt", "Tả chú thỏ trắng nhanh nhẹn gặm củ cà rốt",
  "Kể về một lần em cùng mẹ đi chợ hoa xuân", "Tả con đường làng rải nhựa phong quang sạch đẹp", "Viết đoạn văn 7-9 câu có sử dụng từ láy và hình ảnh so sánh tả cơn mưa rào mùa hạ",
  "Nêu suy nghĩ về tầm quan trọng của tình bạn tuổi thơ", "Tả chiếc trống trường vang giòn báo hiệu giờ vào lớp"
];

// Grade 4 prompts
const grade4BaseTitles = [
  "Tả một cây bóng mát sum suê trên sân trường em", "Tả cây ăn quả trĩu cành trong vườn ông bà", "Tả một loài hoa em yêu thích nhất",
  "Tả chú chó thông minh trung thành của gia đình em", "Tả con mèo mướp dáng đi nhẹ nhàng uyển chuyển", "Tả chú chim bồ câu biểu tượng cho hòa bình",
  "Kể lại câu chuyện Dế Mèn bênh vực kẻ yếu bằng lời của em", "Kể lại một trải nghiệm giúp đỡ người gặp khó khăn", "Viết thư gửi chú bộ đội nơi hải đảo xa xôi",
  "Viết bài văn nêu ý kiến tán thành việc rèn luyện thói quen tự lập", "Viết đoạn văn tưởng tượng cuộc phiêu lưu đến hành tinh xanh",
  "Tả cây dừa nghiêng mình soi bóng bên bờ mương", "Tả chậu hoa cúc vàng đại đóa đón Tết cổ truyền", "Tả chú ngựa phi nước kiệu dũng mãnh trên thảo nguyên",
  "Kể lại một sự việc em chứng kiến thể hiện lòng trung thực", "Viết đoạn văn giới thiệu một nét văn hóa đặc sắc của dân tộc em",
  "Nêu suy nghĩ về việc bảo vệ các loài động vật hoang dã", "Tả cây bàng mùa đông trơ trụi cành rồi đâm chồi biếc vào mùa xuân",
  "Tả chú trâu mộng cần mẫn gặm cỏ trên bờ đê", "Kể lại kỷ niệm sâu sắc nhất giữa em và người bạn thân",
  "Viết thư động viên một người bạn đang gặp chuyện buồn", "Nêu ý kiến về việc hạn chế sử dụng rác thải nhựa một lần",
  "Tả chiếc cặp sách đã gắn bó với em suốt bốn năm tiểu học", "Tả cây phượng vĩ thắp lửa rực rỡ những ngày đầu hè",
  "Tả chú ong chăm chỉ cần mẫn hút mật xây tổ", "Kể lại một câu chuyện cổ tích em yêu thích theo ngôi thứ nhất",
  "Viết đoạn văn miêu tả cảnh một buổi sáng sương mù trên vùng cao", "Nêu cảm nghĩ về truyền thống hiếu học của dân tộc Việt Nam",
  "Tả chậu hoa phong lan kiêu sa nở trên giàn hoa", "Tả đàn cá bơi lội dưới làn nước trong veo ở dòng suối",
  "Kể về một việc làm cụ thể của em góp phần giữ gìn trường lớp xanh sạch đẹp", "Viết thư gửi ông bà kể về thành tích học tập học kỳ 1",
  "Nêu ý kiến về ích lợi của việc tập thể dục thể thao mỗi ngày", "Tả cây tre Việt Nam mộc mạc mà kiên cường",
  "Tả chú rùa biển bơi lội giữa đại dương bao la", "Kể lại một buổi sinh hoạt lớp đáng nhớ với nhiều tiếng cười",
  "Viết bài văn tưởng tượng em được hóa thân thành một giọt nước du ngoạn muôn nơi", "Tả cánh đồng ngô xanh ngút ngàn bên bãi sông",
  "Tả chú vẹt nhiều màu sắc biết bắt chước tiếng người", "Kể về một chuyến du lịch về miền quê sông nước",
  "Viết đoạn văn nêu cảm nghĩ về tấm gương bác sĩ dũng cảm cứu người", "Tả cây mít cổ thụ quả sai trĩu từ gốc lên cành",
  "Tả chú hải âu chao lượn trên ngọn sóng biển khơi", "Kể lại một câu chuyện về tình cảm gia đình ấm áp",
  "Viết thư thăm hỏi thầy cô giáo cũ nhân ngày Nhà giáo Việt Nam 20-11", "Nêu quan điểm của em về việc học sinh tiểu học sử dụng điện thoại thông minh",
  "Tả cây hoa gạo đỏ rực góc trời tháng ba", "Tả chú mèo tam thể mượt mà như nhung",
  "Kể lại câu chuyện Thánh Gióng đánh giặc cứu nước", "Viết bài văn miêu tả chiếc đồng hồ treo tường chứng kiến sự trưởng thành của em"
];

// Grade 5 prompts
const grade5BaseTitles = [
  "Tả người mẹ thân yêu đang ân cần chăm sóc gia đình", "Tả người bố kính yêu với đôi bàn tay chai sần vì vất vả", "Tả người bà hiền từ với nụ cười ấm áp như vầng trăng",
  "Tả thầy giáo hoặc cô giáo em yêu quý nhất", "Tả người bạn thân cùng lớp luôn giúp đỡ em trong học tập", "Tả bác nông dân đang cày cấy trên cánh đồng quê hương",
  "Tả cô lao công cần mẫn quét rác trên đường phố đêm khuya", "Tả chú công an giao thông đứng điều tiết xe cộ dưới trời mưa gió",
  "Tả cảnh một buổi sáng mùa xuân trên quê hương em", "Tả cảnh hoàng hôn thanh bình trên dòng sông quê", "Tả cảnh biển Nha Trang hoặc Sầm Sơn vào một ngày nắng đẹp",
  "Tả cảnh đêm trăng thanh bình ở làng quê Việt Nam", "Tả cảnh một cơn mưa rào mùa hạ đem lại sức sống cho vạn vật",
  "Tả cảnh trường em trước giờ vào học rộn rã tiếng cười", "Tả cảnh cánh đồng lúa chín vàng óng ả vào mùa gặt hái",
  "Kể lại một câu chuyện em đã đọc để lại bài học đạo đức sâu sắc", "Kể lại một việc tốt em đã làm góp phần xây dựng nếp sống văn minh",
  "Kể lại một chuyến đi khám phá vùng đất mới của đất nước", "Viết câu chuyện tưởng tượng về cuộc sống ở Trái Đất 50 năm sau",
  "Nêu ý kiến phản đối hành vi bắt nạt bạn bè trong trường học", "Nêu ý kiến tán thành việc học sinh nên tham gia đọc sách và bảo tồn văn hóa đọc",
  "Nêu suy nghĩ về trách nhiệm của tuổi thơ trong việc bảo vệ môi trường và nguồn nước", "Viết thư gửi các bạn nhỏ vùng cao thể hiện tình cảm sẻ chia, đoàn kết",
  "Viết bài văn tưởng tượng cuộc đối thoại giữa Trái Đất và Con Người", "Tả người thợ xây đang miệt mài dựng nên những công trình mới",
  "Tả bác sĩ đang tận tụy khám chữa bệnh cho các em nhỏ", "Tả cảnh bình minh rực rỡ trên đỉnh núi cao Tây Bắc",
  "Tả dòng sông Hồng phù sa đỏ nặng trĩu mùa lũ", "Tả cảnh công viên rợp bóng cây xanh vào một buổi sáng sớm trong lành",
  "Tả ngày hội đua thuyền truyền thống náo nức trên quê em", "Kể lại kỷ niệm sâu sắc nhất về tình mẫu tử thiêng liêng",
  "Kể lại một lần em vượt qua nỗi sợ hãi hoặc thử thách bản thân", "Viết bài văn tưởng tượng em gặp lại chính mình sau 20 năm",
  "Nêu ý kiến về tầm quan trọng của tính trung thực trong học tập và thi cử", "Nêu suy nghĩ của em về truyền thống Uống nước nhớ nguồn của dân tộc",
  "Tả người lính đảo Trường Sa kiên cường bảo vệ chủ quyền Tổ quốc", "Tả hình ảnh người mẹ thức khuya chăm con bị ốm",
  "Tả cảnh chợ nổi miền Tây tấp nập thuyền bè và hoa trái", "Tả rừng ngập mặn Cần Giờ xanh tươi sức sống",
  "Tả cảnh phố phường lung linh rực rỡ sắc màu đêm giao thừa", "Kể lại câu chuyện Chuyện người con gái Nam Xương hoặc một truyền thuyết lịch sử",
  "Kể lại một hành động dũng cảm cứu bạn đuối nước mà em được biết", "Viết bức thư gửi cho chính mình trong tương lai vào ngày tốt nghiệp đại học",
  "Nêu ý kiến về việc hạn chế sử dụng đồ nhựa và túi nylon", "Nêu quan điểm về việc học sinh có nên tham gia công việc nhà phụ giúp cha mẹ",
  "Tả hình ảnh Bác Hồ kính yêu qua những bức ảnh hoặc thước phim tư liệu", "Tả người nghệ nhân gốm Bát Tràng đôi tay khéo léo vuốt từng nét hoa văn",
  "Tả cảnh thác nước Bản Giốc hùng vĩ tung bọt trắng xóa", "Kể lại ngày khai giảng cuối cùng của thời học sinh tiểu học đầy lưu luyến",
  "Viết bài văn tổng kết chặng đường 5 năm tiểu học và niềm tri ân thầy cô bạn bè"
];

function buildCategory(title: string): EssayCategory {
  if (title.startsWith("Tả ")) return "Miêu tả";
  if (title.startsWith("Kể ")) return "Kể lại sự việc";
  if (title.startsWith("Viết thư") || title.startsWith("Viết tin nhắn")) return "Viết thư, tin nhắn";
  if (title.startsWith("Nêu ý kiến") || title.startsWith("Nêu suy nghĩ") || title.startsWith("Nêu quan điểm")) return "Nêu ý kiến";
  if (title.startsWith("Viết bài văn tưởng tượng") || title.startsWith("Viết đoạn văn tưởng tượng")) return "Viết tưởng tượng, sáng tạo";
  if (title.startsWith("Giới thiệu")) return "Giới thiệu";
  if (title.includes("tình cảm") || title.includes("cảm nghĩ") || title.includes("biết ơn") || title.includes("cảm xúc")) return "Nêu tình cảm, cảm xúc";
  return "Kể chuyện";
}

function buildPromptList(): PromptItem[] {
  const result: PromptItem[] = [];

  // 1. Grade 1: 50 items
  grade1Seeds.forEach((seed, idx) => {
    result.push({
      id: `TV1-${String(idx + 1).padStart(2, '0')}`,
      grade: 1,
      title: seed.title,
      category: seed.category,
      topic: seed.topic,
      requirement: seed.requirement,
      difficulty: seed.difficulty,
      lengthSuggestion: seed.lengthSuggestion,
      languageRequirements: seed.languageRequirements,
      brainstormQuestions: seed.brainstormQuestions,
      rubric: seed.rubric,
      isFavorite: idx === 0
    });
  });

  grade1Titles.forEach((t, idx) => {
    const itemNum = idx + 6;
    const cat = buildCategory(t);
    result.push({
      id: `TV1-${String(itemNum).padStart(2, '0')}`,
      grade: 1,
      title: t,
      category: cat,
      topic: "Đời sống quanh em",
      requirement: `Quan sát và viết từ 2 - 3 câu về ${t.toLowerCase()} phù hợp lứa tuổi lớp 1.`,
      difficulty: itemNum % 4 === 0 ? "Mở rộng" : "Cơ bản",
      lengthSuggestion: "2 - 3 câu ngắn",
      languageRequirements: ["Đầu câu viết hoa", "Cuối câu có dấu chấm", "Dùng từ ngữ giản dị, trong sáng"],
      brainstormQuestions: [
        `Em thấy ${t.toLowerCase()} có đặc điểm gì nổi bật?`,
        `Chi tiết nào làm em cảm thấy thích thú nhất?`,
        `Em muốn nói điều gì về điều đó?`
      ],
      rubric: [
        { criteria: "Đúng nội dung đề bài", points: 4 },
        { criteria: "Câu văn rõ nghĩa, có dấu chấm", points: 4 },
        { criteria: "Chữ viết nắn nót, cẩn thận", points: 2 }
      ],
      isFavorite: itemNum === 10
    });
  });

  // 2. Grade 2: 50 items
  grade2BaseTitles.forEach((t, idx) => {
    const itemNum = idx + 1;
    const cat = buildCategory(t);
    result.push({
      id: `TV2-${String(itemNum).padStart(2, '0')}`,
      grade: 2,
      title: t,
      category: cat,
      topic: "Trường học & Gia đình",
      requirement: `Viết một đoạn văn ngắn khoảng 3 - 5 câu về ${t.toLowerCase()} theo định hướng sách Kết nối tri thức.`,
      difficulty: itemNum % 5 === 0 ? "Sáng tạo" : (itemNum % 2 === 0 ? "Mở rộng" : "Cơ bản"),
      lengthSuggestion: "3 - 5 câu",
      languageRequirements: ["Viết đúng chính tả", "Dùng từ ngữ gợi tả, gợi cảm", "Có liên kết giữa các câu"],
      brainstormQuestions: [
        `Đối tượng hoặc sự việc em muốn viết là gì?`,
        `Diễn biến hoặc đặc điểm chính của sự việc/sự vật đó ra sao?`,
        `Cảm xúc và suy nghĩ của em sau sự việc đó thế nào?`
      ],
      rubric: [
        { criteria: "Hiểu đúng đề và đủ số câu gợi ý (3-5 câu)", points: 3 },
        { criteria: "Nội dung chân thực, diễn đạt mạch lạc", points: 4 },
        { criteria: "Dùng từ sinh động, chính tả chuẩn", points: 3 }
      ],
      isFavorite: itemNum === 1 || itemNum === 9
    });
  });

  // 3. Grade 3: 50 items
  grade3BaseTitles.forEach((t, idx) => {
    const itemNum = idx + 1;
    const cat = buildCategory(t);
    result.push({
      id: `TV3-${String(itemNum).padStart(2, '0')}`,
      grade: 3,
      title: t,
      category: cat,
      topic: "Non sông & Bạn bè",
      requirement: `Viết đoạn văn từ 5 - 7 hoặc 7 - 9 câu về ${t.toLowerCase()}, thể hiện cảm xúc chân thành và sử dụng các biện pháp nghệ thuật thích hợp.`,
      difficulty: itemNum % 4 === 0 ? "Sáng tạo" : "Mở rộng",
      lengthSuggestion: "7 - 9 câu",
      languageRequirements: ["Sử dụng ít nhất 1 từ láy", "Có ít nhất 1 hình ảnh so sánh", "Trình bày đoạn văn mạch lạc"],
      brainstormQuestions: [
        `Giới thiệu đối tượng/sự việc em muốn kể hoặc miêu tả.`,
        `Kể chi tiết trình tự các sự việc hoặc các nét nổi bật (hình dáng, hoạt động).`,
        `Em ấn tượng nhất với điều gì? (Có thể vận dụng so sánh: như, tựa như...).`,
        `Cảm xúc, tình cảm hoặc bài học em rút ra là gì?`
      ],
      rubric: [
        { criteria: "Đúng chủ đề, đủ dung lượng 7-9 câu", points: 3 },
        { criteria: "Có từ láy và hình ảnh so sánh phù hợp", points: 3 },
        { criteria: "Cảm xúc chân thật, giàu hình ảnh", points: 2 },
        { criteria: "Chính tả, ngữ pháp chuẩn xác", points: 2 }
      ],
      isFavorite: itemNum === 1 || itemNum === 5 || itemNum === 48
    });
  });

  // 4. Grade 4: 50 items
  grade4BaseTitles.forEach((t, idx) => {
    const itemNum = idx + 1;
    const cat = buildCategory(t);
    result.push({
      id: `TV4-${String(itemNum).padStart(2, '0')}`,
      grade: 4,
      title: t,
      category: cat,
      topic: "Thế giới muôn màu",
      requirement: `Lập dàn ý và viết bài văn (hoặc đoạn văn hoàn chỉnh) về ${t.toLowerCase()}, có mở bài, thân bài, kết bài mạch lạc.`,
      difficulty: itemNum % 3 === 0 ? "Sáng tạo" : "Mở rộng",
      lengthSuggestion: "Bài văn 3 phần (15 - 20 câu)",
      languageRequirements: ["Sử dụng biện pháp so sánh và nhân hóa", "Dùng từ ngữ gợi tả âm thanh, hình ảnh", "Mở bài và kết bài tự nhiên"],
      brainstormQuestions: [
        `Mở bài: Giới thiệu sự vật, sự việc hoặc nhân vật như thế nào để hấp dẫn?`,
        `Thân bài: Quan sát theo trình tự nào (bao quát đến chi tiết, hoặc theo thời gian)?`,
        `Chi tiết nào là linh hồn của bài văn? Vận dụng nhân hóa, so sánh ra sao?`,
        `Kết bài: Bày tỏ tình cảm, sự gắn bó và liên hệ bài học bản thân.`
      ],
      rubric: [
        { criteria: "Bố cục rõ ràng 3 phần (Mở, Thân, Kết)", points: 3 },
        { criteria: "Vận dụng tốt nhân hóa, so sánh, từ láy", points: 3 },
        { criteria: "Quan sát tinh tế, chi tiết chọn lọc", points: 2 },
        { criteria: "Diễn đạt truyền cảm, giàu cảm xúc", points: 2 }
      ],
      isFavorite: itemNum === 1 || itemNum === 10
    });
  });

  // 5. Grade 5: 50 items
  grade5BaseTitles.forEach((t, idx) => {
    const itemNum = idx + 1;
    const cat = buildCategory(t);
    result.push({
      id: `TV5-${String(itemNum).padStart(2, '0')}`,
      grade: 5,
      title: t,
      category: cat,
      topic: "Con người & Đất nước",
      requirement: `Viết bài văn hoàn chỉnh về ${t.toLowerCase()}, thể hiện chiều sâu cảm xúc, vốn từ phong phú và kỹ năng lập dàn ý sáng tạo.`,
      difficulty: itemNum % 3 === 0 ? "Sáng tạo" : "Mở rộng",
      lengthSuggestion: "Bài văn hoàn chỉnh (20 - 30 câu)",
      languageRequirements: ["Mở bài gián tiếp, kết bài mở rộng", "Phối hợp từ tượng hình, từ tượng thanh, từ láy", "Các biện pháp tu từ so sánh, nhân hóa hài hòa"],
      brainstormQuestions: [
        `Mở bài: Chọn cách mở bài gián tiếp xuất phát từ kỉ niệm, câu thơ hay âm thanh nào?`,
        `Thân bài: Miêu tả ngoại hình kết hợp cử chỉ, hành động, nét tính cách đặc trưng.`,
        `Kỷ niệm hoặc khoảnh khắc xúc động nào gắn liền với đối tượng?`,
        `Kết bài mở rộng: Suy ngẫm về tình người, lòng biết ơn và trách nhiệm của bản thân.`
      ],
      rubric: [
        { criteria: "Bố cục hoàn chỉnh, liên kết đoạn chặt chẽ", points: 2.5 },
        { criteria: "Nội dung sâu sắc, cảm xúc chân thực xúc động", points: 3 },
        { criteria: "Nghệ thuật tu từ tinh tế, từ ngữ giàu hình tượng", points: 2.5 },
        { criteria: "Chính tả, ngữ pháp, phong cách viết đạt chuẩn", points: 2 }
      ],
      isFavorite: itemNum === 1 || itemNum === 9 || itemNum === 20
    });
  });

  return result;
}

export const MOCK_PROMPTS: PromptItem[] = buildPromptList();
