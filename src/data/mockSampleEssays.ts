import { EssaySubmission, TeacherFeedbackData } from '../types';

export const MOCK_ESSAYS: EssaySubmission[] = [
  // 1. Featured Essay: Lê Mai Anh (hocsinh01) - Grade 3
  {
    id: "ESSAY-3A-01",
    studentId: "HS-3A-01",
    studentName: "Lê Mai Anh",
    className: "3A",
    grade: 3,
    promptId: "TV3-05",
    promptTitle: "Tả chú mèo mướp bắt chuột tài ba",
    category: "Miêu tả",
    extraRequirements: ["Viết khoảng 7 - 9 câu", "Có sử dụng từ láy", "Có một hình ảnh so sánh"],
    brainstormAnswers: [
      { question: "Chú mèo nhà em tên là gì, lông màu gì?", answer: "Chú mèo tên là Miu Miu, lông màu xám tro có vằn đen xám như vằn hổ nhỏ." },
      { question: "Đôi mắt và bước đi của chú mèo có gì đặc biệt?", answer: "Đôi mắt tròn xoe xanh biếc như hai hòn bi ve trong suốt. Bước đi rón rén, êm ru không một tiếng động." },
      { question: "Em nhớ nhất lúc chú mèo bắt chuột ra sao?", answer: "Một đêm nọ nghe tiếng sột soạt ở góc bếp, Miu nằm phục im lìm rồi phóng vút một cái tóm gọn chú chuột nhắt." },
      { question: "Tình cảm của em với chú mèo thế nào?", answer: "Em rất yêu Miu Miu, mỗi chiều đi học về chú đều chạy ra cọ đầu vào chân em mừng rỡ." }
    ],
    outlineHistory: [
      [
        {
          id: "sec-1",
          title: "Mở đầu đoạn văn",
          points: ["Giới thiệu chú mèo Miu Miu thân thiết của gia đình em."]
        },
        {
          id: "sec-2",
          title: "Thân đoạn (Hình dáng & Tài bắt chuột)",
          points: [
            "Bộ lông màu xám tro óng mượt với những sọc vằn vện.",
            "Đôi mắt tròn xoe, sáng trong như hai hòn bi ve.",
            "Bốn chân có đệm thịt êm ái, bước đi nhẹ nhàng không tiếng động.",
            "Tài bắt chuột: rình mồi kiên nhẫn rồi lao nhanh như một mũi tên."
          ]
        },
        {
          id: "sec-3",
          title: "Kết thúc đoạn văn",
          points: ["Bày tỏ tình cảm yêu quý chú mèo, xem Miu Miu như một thành viên nhỏ trong nhà."]
        }
      ]
    ],
    currentOutline: [
      {
        id: "sec-1",
        title: "Mở đầu đoạn văn",
        points: ["Giới thiệu chú mèo Miu Miu thân thiết của gia đình em."]
      },
      {
        id: "sec-2",
        title: "Thân đoạn (Hình dáng & Tài bắt chuột)",
        points: [
          "Bộ lông màu xám tro óng mượt với những sọc vằn vện.",
          "Đôi mắt tròn xoe, sáng trong như hai hòn bi ve.",
          "Bốn chân có đệm thịt êm ái, bước đi rón rén không một tiếng động.",
          "Tài bắt chuột: rình mồi kiên nhẫn rồi phóng vút tóm gọn chuột nhắt."
        ]
      },
      {
        id: "sec-3",
        title: "Kết thúc đoạn văn",
        points: ["Bày tỏ tình cảm gắn bó, chăm sóc Miu Miu mỗi ngày."]
      }
    ],
    savedIdeas: ["rón rén", "mắt sáng như hai hòn bi ve", "phóng vút như mũi tên", "bước chân êm ru"],
    originalContent: "Nhà em có nuôi một chú mèo mướp đặt tên là Miu Miu. Toàn thân Miu khoác chiếc áo màu xám tro, điểm những đường vằn đen trông hệt như một chú hổ con. Đôi mắt chú tròn xoe và trong veo như hai hòn bi ve. Ban ngày, chú thường nằm lười biếng sưởi nắng bên thềm hiên. Nhưng khi màn đêm buông xuống, đôi mắt chú sáng quắc lên rình mồi. Đôi bàn chân có lớp đệm thịt dày giúp chú bước đi êm ru không hề gây ra một tiếng động nào. Bỗng chú lao vút tới góc bếp tóm gọn chú chuột nhắt phá phách. Em rất yêu chú mèo Miu Miu của mình.",
    revisedContent: "Nhà em có nuôi một chú mèo mướp đáng yêu, em đặt tên cho chú là Miu Miu. Toàn thân Miu khoác chiếc áo lông màu xám tro mềm mại, điểm xuyết những đường vằn đen trông oai vệ hệt như một chú hổ con thu nhỏ. Đôi mắt chú tròn xoe và xanh biếc tựa hai hòn bi ve lấp lánh trong đêm tối. Ban ngày, Miu hay nằm lim dim sưởi nắng ấm bên thềm hiên. Thế nhưng khi đêm xuống, chú biến thành một dũng sĩ săn mồi cừ khôi. Nhờ bốn đệm chân êm ái, chú bước đi rón rén, êm ru không một tiếng động nhỏ. Vèo một cái, chú phóng vút tới góc bếp tóm gọn chú chuột nhắt gian xảo. Em rất yêu quý Miu Miu và luôn coi chú như một người bạn nhỏ thân thiết trong nhà.",
    version: 2,
    assistantFeedback: {
      understanding: "Em đã hiểu rất chính xác đề bài: Miêu tả chú mèo mướp và làm nổi bật được tài bắt chuột.",
      content: "Nội dung phong phú, sinh động, có quan sát từ ngoại hình đến hoạt động bắt chuột ban đêm.",
      structure: "Đoạn văn có mở đầu, diễn biến và kết thúc rất tự nhiên, liên kết câu nhịp nhàng.",
      vocabulary: "Sử dụng từ ngữ gợi tả tốt: 'tròn xoe', 'trong veo', 'lao vút'. Có thể thêm từ láy 'rón rén' hoặc 'lim dim' để bài viết thêm mượt mà hơn.",
      emotion: "Cảm xúc chân thật, thể hiện rõ tình yêu thương dành cho chú thú cưng.",
      goodSentences: [
        "Toàn thân Miu khoác chiếc áo màu xám tro, điểm những đường vằn đen trông hệt như một chú hổ con.",
        "Đôi mắt chú tròn xoe và trong veo như hai hòn bi ve."
      ],
      spelling: "Bài viết không mắc lỗi chính tả nào, dấu câu đặt chuẩn xác.",
      grammar: "Các câu văn hoàn chỉnh, rõ chủ ngữ - vị ngữ.",
      specialRequirements: "Đã đáp ứng đủ yêu cầu: bài dài 8 câu (trong khoảng 7-9 câu), có hình ảnh so sánh độc đáo và từ ngữ gợi cảm.",
      improvements: [
        "Ở câu kể về lúc bắt chuột, em có thể thêm từ ngữ diễn tả sự bất ngờ như 'Vèo một cái' hoặc 'Nhanh như chớp' để hành động thêm phần dứt khoát.",
        "Câu kết có thể mở rộng thêm một chút về việc em chăm sóc chú mèo mỗi ngày."
      ],
      suggestedScore: 9.0
    },
    officialFeedback: {
      understanding: "Em nắm vững đề bài miêu tả con vật nuôi, đúng trọng tâm chương trình Kết nối tri thức.",
      content: "Bài viết rất có hồn. Chi tiết so sánh vằn lông như chú hổ con và đôi mắt như bi ve rất tinh tế.",
      structure: "Bố cục đoạn văn 8 câu rất chặt chẽ, câu mở đoạn và câu kết đoạn trọn vẹn.",
      vocabulary: "Bản sửa lần 2 em đã thêm được các từ láy rất đắt: 'rón rén', 'lim dim', 'êm ái'.",
      emotion: "Lời văn trong trẻo, giàu tình cảm.",
      goodSentences: [
        "Vèo một cái, chú phóng vút tới góc bếp tóm gọn chú chuột nhắt gian xảo.",
        "Em rất yêu quý Miu Miu và luôn coi chú như một người bạn nhỏ thân thiết trong nhà."
      ],
      spelling: "Chính tả hoàn hảo, trình bày sạch sẽ.",
      grammar: "Đặt câu mạch lạc, biết dùng dấu phẩy ngắt nhịp rất khéo.",
      specialRequirements: "Đạt trọn vẹn các yêu cầu về từ láy, so sánh và dung lượng câu.",
      improvements: ["Tiếp tục phát huy lối quan sát tỉ mỉ và dùng từ giàu hình ảnh ở những bài văn tiếp theo nhé!"],
      suggestedScore: 9.0,
      officialScore: 9.5,
      teacherNote: "Cô khen Mai Anh! Đoạn văn của con rất sinh động, cô như đang thấy chú mèo Miu Miu đang sưởi nắng trước mắt vậy. Chúc mừng con đã hoàn thành xuất sắc bài viết!",
      teacherReviewedAt: "2026-10-20T15:30:00Z"
    },
    studentReactions: [
      {
        type: "agree",
        comment: "Con cảm ơn cô và Bạn Bút Chì đã gợi ý cho con thêm từ 'rón rén' và câu 'Vèo một cái' làm câu văn nghe vui hơn hẳn ạ!",
        createdAt: "2026-10-19T10:15:00Z",
        aiResponse: "Bạn Bút Chì rất vui vì Mai Anh đã tự mình lựa chọn những từ ngữ tuyệt vời như thế. Cố lên nhé bạn nhỏ!"
      }
    ],
    teacherMessages: [
      { sender: "teacher", text: "Mai Anh ơi, bài văn của con lần này viết tiến bộ vượt bậc so với tuần trước đấy!", time: "2026-10-20 15:35" },
      { sender: "student", text: "Dạ con cảm ơn cô giáo nhiều ạ, con sẽ tiếp tục cố gắng ạ!", time: "2026-10-20 16:00" }
    ],
    status: "da_cham",
    createdAt: "2026-10-18T08:00:00Z",
    updatedAt: "2026-10-20T15:30:00Z",
    submittedToTeacherAt: "2026-10-19T11:00:00Z",
    wordCount: 148,
    sentenceCount: 8
  },

  // 2. Grade 1 Sample: Nguyễn Đức An (HS-1A-01)
  {
    id: "ESSAY-1A-01",
    studentId: "HS-1A-01",
    studentName: "Nguyễn Đức An",
    className: "1A",
    grade: 1,
    promptId: "TV1-01",
    promptTitle: "Giới thiệu về bản thân em",
    category: "Giới thiệu",
    extraRequirements: ["Viết 2 - 3 câu", "Đầu câu viết hoa, cuối câu có dấu chấm"],
    brainstormAnswers: [
      { question: "Em tên là gì và học lớp nào?", answer: "Em tên là Nguyễn Đức An, học sinh lớp 1A." },
      { question: "Sở thích của em là gì?", answer: "Em thích đá bóng và vẽ ô tô." }
    ],
    outlineHistory: [],
    currentOutline: [
      { id: "sec-1", title: "Giới thiệu", points: ["Em tên là Nguyễn Đức An, học lớp 1A.", "Em rất thích chơi đá bóng cùng các bạn.", "Em mong được làm quen với tất cả mọi người."] }
    ],
    savedIdeas: ["đá bóng", "học sinh lớp 1A"],
    originalContent: "Em tên là Nguyễn Đức An. Năm nay em học lớp 1A trường tiểu học Ban Mai. Em rất thích đá bóng cùng các bạn vào giờ ra chơi.",
    version: 1,
    assistantFeedback: {
      understanding: "Em đã giới thiệu đúng và đủ tên, lớp, sở thích của bản thân.",
      content: "Các câu ngắn gọn, dễ hiểu, phù hợp với học sinh lớp 1.",
      structure: "Đoạn văn 3 câu rõ ràng.",
      vocabulary: "Từ ngữ trong sáng, chuẩn mực.",
      emotion: "Thân thiện, vui vẻ.",
      goodSentences: ["Em rất thích đá bóng cùng các bạn vào giờ ra chơi."],
      spelling: "Viết đúng chính tả, đầu câu có viết hoa và cuối câu có dấu chấm.",
      grammar: "Câu văn đầy đủ thành phần.",
      specialRequirements: "Đúng 3 câu theo yêu cầu.",
      improvements: ["Em có thể tập viết thêm một câu chúc các bạn để đoạn văn thêm thân mật."],
      suggestedScore: 9.0
    },
    officialFeedback: {
      understanding: "Bài làm rất tốt, con tự tin giới thiệu bản thân.",
      content: "Nội dung chân thực, đáng yêu.",
      structure: "Đủ 3 câu hoàn chỉnh.",
      vocabulary: "Dùng từ đúng lứa tuổi.",
      emotion: "Vui tươi, hòa đồng.",
      goodSentences: ["Em tên là Nguyễn Đức An."],
      spelling: "Không sai lỗi chính tả.",
      grammar: "Đặt câu chuẩn.",
      specialRequirements: "Đáp ứng tốt yêu cầu lớp 1.",
      improvements: ["Con tiếp tục rèn chữ viết thật đều nét nhé."],
      suggestedScore: 9.0,
      officialScore: 9.0,
      teacherNote: "Cô khen Đức An đã biết viết câu tròn trịa, đầu câu viết hoa rất đúng quy tắc!",
      teacherReviewedAt: "2026-10-19T09:00:00Z"
    },
    studentReactions: [],
    teacherMessages: [],
    status: "da_cham",
    createdAt: "2026-10-18T14:00:00Z",
    updatedAt: "2026-10-19T09:00:00Z",
    submittedToTeacherAt: "2026-10-18T15:30:00Z",
    wordCount: 32,
    sentenceCount: 3
  },

  // 3. Grade 2 Sample: Trần Thị Mai (HS-2A-02)
  {
    id: "ESSAY-2A-02",
    studentId: "HS-2A-02",
    studentName: "Trần Thị Mai",
    className: "2A",
    grade: 2,
    promptId: "TV2-02",
    promptTitle: "Tả đồ dùng học tập em yêu quý nhất",
    category: "Miêu tả",
    extraRequirements: ["Viết khoảng 4 - 5 câu", "Có từ chỉ màu sắc và công dụng"],
    brainstormAnswers: [
      { question: "Đồ vật em muốn tả là gì?", answer: "Chiếc hộp bút màu hồng hình chú thỏ." },
      { question: "Bên trong hộp bút có những gì?", answer: "Có bút chì, thước kẻ kẻ thẳng và cục tẩy dâu tây." }
    ],
    outlineHistory: [],
    currentOutline: [
      { id: "s1", title: "Đoạn văn", points: ["Giới thiệu chiếc hộp bút", "Tả màu sắc bên ngoài", "Kể đồ dùng bên trong", "Cảm nghĩ của em"] }
    ],
    savedIdeas: ["hồng phấn", "xinh xắn", "ngăn nắp"],
    originalContent: "Nhân dịp sinh nhật, mẹ tặng em một chiếc hộp bút màu hồng phấn xinh xắn. Trên nắp hộp có in hình chú thỏ trắng đang ôm củ cà rốt. Mở hộp ra, bên trong có hai ngăn rộng rãi để em xếp bút chì, thước kẻ và cục tẩy thơm mùi dâu. Nhờ có chiếc hộp bút, đồ dùng học tập của em luôn được sắp xếp ngăn nắp. Em rất yêu quý món quà này của mẹ.",
    version: 1,
    officialFeedback: {
      understanding: "Đúng đề miêu tả đồ dùng học tập.",
      content: "Miêu tả cả bên ngoài và bên trong hộp bút rất chi tiết.",
      structure: "5 câu liên kết chặt chẽ.",
      vocabulary: "Có các từ đẹp: 'hồng phấn', 'ngăn nắp', 'xinh xắn'.",
      emotion: "Biết ơn và trân trọng quà của mẹ.",
      goodSentences: ["Mở hộp ra, bên trong có hai ngăn rộng rãi để em xếp bút chì, thước kẻ và cục tẩy thơm mùi dâu."],
      spelling: "Chính tả chuẩn xác.",
      grammar: "Câu văn lưu loát.",
      specialRequirements: "Đúng 5 câu theo quy định.",
      improvements: ["Con viết rất tốt, giữ vững phong độ nhé!"],
      suggestedScore: 9.5,
      officialScore: 9.5,
      teacherNote: "Đoạn văn của Mai rất ngọt ngào, câu từ gãy gọn và giàu hình ảnh!",
      teacherReviewedAt: "2026-10-19T10:00:00Z"
    },
    studentReactions: [],
    teacherMessages: [],
    status: "da_cham",
    createdAt: "2026-10-18T10:00:00Z",
    updatedAt: "2026-10-19T10:00:00Z",
    submittedToTeacherAt: "2026-10-18T11:00:00Z",
    wordCount: 78,
    sentenceCount: 5
  },

  // 4. Grade 4 Sample: Hoàng Gia Bảo (HS-4A-05)
  {
    id: "ESSAY-4A-05",
    studentId: "HS-4A-05",
    studentName: "Hoàng Gia Bảo",
    className: "4A",
    grade: 4,
    promptId: "TV4-01",
    promptTitle: "Tả một cây bóng mát sum suê trên sân trường em",
    category: "Miêu tả",
    extraRequirements: ["Bài văn 3 phần", "Sử dụng nhân hóa và so sánh"],
    brainstormAnswers: [
      { question: "Cây bóng mát em chọn là cây gì?", answer: "Cây bàng già sừng sững giữa sân trường." },
      { question: "Tán lá và thân cây trông như thế nào?", answer: "Thân cây xù xì bạc phếch, tán lá tỏa rộng như chiếc ô khổng lồ." }
    ],
    outlineHistory: [],
    currentOutline: [
      { id: "mb", title: "Mở bài", points: ["Giới thiệu cây bàng già giữa sân trường."] },
      { id: "tb", title: "Thân bài", points: ["Tả thân cây, rễ cây và vỏ cây.", "Tả cành bàng và các tầng tán lá xanh mướt.", "Kỷ niệm vui chơi dưới bóng râm giờ ra chơi."] },
      { id: "kb", title: "Kết bài", points: ["Tình cảm gắn bó với cây bàng suốt những năm tiểu học."] }
    ],
    savedIdeas: ["chiếc ô xanh khổng lồ", "ôm ấp tuổi thơ", "rì rào trong gió"],
    originalContent: "Sân trường em trồng rất nhiều loài cây tỏa bóng mát, nhưng thân thương nhất đối với em là cây bàng già đứng sừng sững giữa sân. Nhìn từ xa, cây bàng như một chiếc ô xanh khổng lồ che rợp một khoảng sân rộng. Thân cây to bằng hai vòng tay chúng em ôm, lớp vỏ nâu xù xì hằn lên những vết nứt thời gian. Tán bàng vươn ra nhiều tầng, lá bàng xanh mướt dày dặn đón ánh nắng hè chói chang. Mỗi giờ ra chơi, chúng em lại ùa ra dưới gốc bàng râm mát để đọc sách và chơi bắn bi. Cây bàng như một người bác hiền từ luôn dang rộng vòng tay che chở cho tuổi học trò. Mai này dù có rời xa mái trường, em vẫn sẽ mãi nhớ về cây bàng thân thương.",
    version: 1,
    officialFeedback: {
      understanding: "Viết đúng thể loại miêu tả cây cối lớp 4.",
      content: "Quan sát tinh tế từ xa đến gần, có cả hình ảnh và hoạt động dưới gốc cây.",
      structure: "Bố cục 3 phần rõ ràng, chuyển ý mượt mà.",
      vocabulary: "Vận dụng tốt từ láy và hình ảnh nhân hóa: 'người bác hiền từ dang rộng vòng tay'.",
      emotion: "Tình cảm tha thiết với mái trường.",
      goodSentences: [
        "Nhìn từ xa, cây bàng như một chiếc ô xanh khổng lồ che rợp một khoảng sân rộng.",
        "Cây bàng như một người bác hiền từ luôn dang rộng vòng tay che chở cho tuổi học trò."
      ],
      spelling: "Chuẩn xác.",
      grammar: "Câu văn dài có nhịp điệu phong phú.",
      specialRequirements: "Đáp ứng đầy đủ yêu cầu bài văn 3 phần, có so sánh và nhân hóa.",
      improvements: ["Có thể tả thêm chút biến đổi của màu lá bàng khi chuyển sang mùa đông để bài văn thêm sâu sắc."],
      suggestedScore: 9.0,
      officialScore: 9.0,
      teacherNote: "Bài viết rất truyền cảm, hình ảnh nhân hóa người bác hiền từ rất đắt giá!",
      teacherReviewedAt: "2026-10-20T11:00:00Z"
    },
    studentReactions: [],
    teacherMessages: [],
    status: "da_cham",
    createdAt: "2026-10-19T08:30:00Z",
    updatedAt: "2026-10-20T11:00:00Z",
    submittedToTeacherAt: "2026-10-19T10:00:00Z",
    wordCount: 172,
    sentenceCount: 9
  },

  // 5. Grade 5 Sample: Đỗ Phương Thảo (HS-5A-03)
  {
    id: "ESSAY-5A-03",
    studentId: "HS-5A-03",
    studentName: "Đỗ Phương Thảo",
    className: "5A",
    grade: 5,
    promptId: "TV5-01",
    promptTitle: "Tả người mẹ thân yêu đang ân cần chăm sóc gia đình",
    category: "Miêu tả",
    extraRequirements: ["Bài văn hoàn chỉnh", "Mở bài gián tiếp", "Kết bài mở rộng"],
    brainstormAnswers: [
      { question: "Mẹ em năm nay bao nhiêu tuổi và làm nghề gì?", answer: "Mẹ em ba mươi tám tuổi, là cô giáo dạy mầm non." },
      { question: "Hình dáng và ánh mắt của mẹ thế nào?", answer: "Dáng người thon thả, đôi mắt hiền từ và đôi bàn tay có những vết chai vì chăm sóc con." },
      { question: "Khoảnh khắc nào em nhớ nhất về mẹ?", answer: "Bữa cơm tối mẹ vừa nấu nướng vừa cười hỏi thăm chuyện học hành của em." }
    ],
    outlineHistory: [],
    currentOutline: [
      { id: "mb", title: "Mở bài gián tiếp", points: ["Dẫn dắt từ câu hát về mẹ để giới thiệu người mẹ kính yêu."] },
      { id: "tb", title: "Thân bài", points: ["Tả nét ngoại hình dịu dàng, đôi bàn tay cần cù.", "Tả hành động mẹ tất bật nấu cơm, chăm lo từng giấc ngủ cho em.", "Kỷ niệm đêm mẹ thức trắng trông em khi bị sốt."] },
      { id: "kb", title: "Kết bài mở rộng", points: ["Lòng biết ơn sâu sắc và lời hứa chăm ngoan, học giỏi để mẹ vui lòng."] }
    ],
    savedIdeas: ["ánh mắt dịu hiền", "đôi bàn tay tần tảo", "bến đỗ bình yên"],
    originalContent: "Ai trong cuộc đời cũng có một bến đỗ bình yên để trở về, và với em, bến đỗ ấy chính là vòng tay ấm áp của mẹ. Mẹ em năm nay gần bốn mươi tuổi, vóc dáng thanh mảnh cùng nụ cười luôn rạng rỡ trên môi. Đôi mắt mẹ đen láy, ánh lên vẻ hiền từ và bao dung vô bờ bến. Mỗi buổi chiều đi làm về, dù mệt mỏi nhưng mẹ vẫn thoăn thoắt vào bếp chuẩn bị bữa cơm nóng hổi cho cả nhà. Đôi bàn tay mẹ có nhiều vết chai sần vì năm tháng tần tảo lo toan, nhưng mỗi khi đôi tay ấy xoa đầu em, em luôn cảm thấy một sự che chở kỳ diệu. Em nhớ nhất những đêm em bị sốt cao, mẹ thức trắng đêm chườm khăn ấm, ánh mắt lo âu không hề chợp mắt. Mẹ chính là ngọn lửa sưởi ấm tâm hồn em. Em tự hứa sẽ học tập thật chăm chỉ, rèn luyện thật tốt để xứng đáng với tình yêu thương bao la như biển trời của mẹ.",
    version: 1,
    officialFeedback: {
      understanding: "Bài làm rất xuất sắc, đúng chủ đề miêu tả người của lớp 5.",
      content: "Nội dung cảm động, khắc họa được cả ngoại hình lẫn tâm hồn và hành động tần tảo của mẹ.",
      structure: "Mở bài gián tiếp mượt mà, kết bài mở rộng có liên hệ bản thân sâu sắc.",
      vocabulary: "Vốn từ phong phú, chọn lọc: 'vết chai sần tần tảo', 'bến đỗ bình yên', 'ngọn lửa sưởi ấm'.",
      emotion: "Tình cảm chân thành, xúc động rơi nước mắt.",
      goodSentences: [
        "Ai trong cuộc đời cũng có một bến đỗ bình yên để trở về, và với em, bến đỗ ấy chính là vòng tay ấm áp của mẹ.",
        "Đôi bàn tay mẹ có nhiều vết chai sần vì năm tháng tần tảo lo toan, nhưng mỗi khi đôi tay ấy xoa đầu em, em luôn cảm thấy một sự che chở kỳ diệu."
      ],
      spelling: "Hoàn hảo.",
      grammar: "Câu văn giàu nhạc tính, nhịp điệu uyển chuyển.",
      specialRequirements: "Đáp ứng chuẩn mực mở bài gián tiếp và kết bài mở rộng.",
      improvements: ["Một bài văn tuyệt vời, cô rất tự hào về con!"],
      suggestedScore: 9.8,
      officialScore: 10.0,
      teacherNote: "Bài văn của Phương Thảo xứng đáng được chọn đọc trước lớp làm bài văn mẫu! Cảm xúc của con thật sâu lắng.",
      teacherReviewedAt: "2026-10-20T14:00:00Z"
    },
    studentReactions: [],
    teacherMessages: [],
    status: "da_cham",
    createdAt: "2026-10-19T13:00:00Z",
    updatedAt: "2026-10-20T14:00:00Z",
    submittedToTeacherAt: "2026-10-19T16:00:00Z",
    wordCount: 228,
    sentenceCount: 11
  }
];

// Generate 20 more mock submissions to reach 25 sample essays across all 5 classes
const morePromptTitles = [
  { grade: 1, title: "Tả chiếc bút chì thân thiết của em", student: "Phạm Gia Huy", class: "1A", status: "da_cham" as const, score: 8.5 },
  { grade: 1, title: "Kể về một người thân yêu nhất trong nhà", student: "Vũ Khánh Linh", class: "1A", status: "da_cham" as const, score: 9.0 },
  { grade: 1, title: "Cây hoa hồng trong vườn nhà em", student: "Đặng Minh Quân", class: "1A", status: "da_nop" as const, score: 8.5 },
  { grade: 1, title: "Cặp sách xinh xắn đến trường", student: "Bùi Ngọc Yến", class: "1A", status: "dang_viet" as const, score: 8.0 },
  
  { grade: 2, title: "Kể một việc tốt em đã làm ở trường", student: "Lê Quốc Bảo", class: "2A", status: "da_cham" as const, score: 9.0 },
  { grade: 2, title: "Kể lại một buổi sáng chuẩn bị đi học", student: "Ngô Thu Hằng", class: "2A", status: "da_cham" as const, score: 8.5 },
  { grade: 2, title: "Tả chú chó cưng trung thành của nhà em", student: "Dương Tuấn Kiệt", class: "2A", status: "da_nop" as const, score: 8.5 },
  { grade: 2, title: "Viết đoạn văn ngắn về tình cảm với mẹ", student: "Lý Hải Yến", class: "2A", status: "dang_lap_dan_y" as const, score: 8.0 },

  { grade: 3, title: "Kể lại một việc tốt em đã làm để bảo vệ môi trường", student: "Phan Văn Nam", class: "3A", status: "da_cham" as const, score: 9.0 },
  { grade: 3, title: "Tả dòng sông quê hương trong một buổi chiều hoàng hôn", student: "Hoàng Như Quỳnh", class: "3A", status: "da_cham" as const, score: 8.5 },
  { grade: 3, title: "Viết thư thăm hỏi sức khỏe ông bà ở quê", student: "Trần Minh Khang", class: "3A", status: "can_giup_do" as const, score: 7.5 },
  { grade: 3, title: "Tả cây phượng vĩ thắp lửa rực rỡ hè về", student: "Nguyễn Hà My", class: "3A", status: "dang_tim_y" as const, score: 8.0 },

  { grade: 4, title: "Tả chú chó thông minh trung thành của gia đình em", student: "Vũ Tuấn Đạt", class: "4A", status: "da_cham" as const, score: 9.0 },
  { grade: 4, title: "Viết thư gửi chú bộ đội nơi hải đảo xa xôi", student: "Đỗ Hải Yến", class: "4A", status: "da_cham" as const, score: 9.5 },
  { grade: 4, title: "Kể lại câu chuyện Dế Mèn bênh vực kẻ yếu", student: "Bùi Quốc Khánh", class: "4A", status: "da_nop" as const, score: 8.5 },
  { grade: 4, title: "Tả chậu hoa cúc vàng đại đóa đón Tết", student: "Phạm Thúy Hằng", class: "4A", status: "dang_viet" as const, score: 8.0 },

  { grade: 5, title: "Tả cảnh một buổi sáng mùa xuân trên quê hương em", student: "Huỳnh Minh Trí", class: "5A", status: "da_cham" as const, score: 9.5 },
  { grade: 5, title: "Tả cô lao công cần mẫn quét rác trên đường phố", student: "Nguyễn Khánh Ngân", class: "5A", status: "da_cham" as const, score: 9.0 },
  { grade: 5, title: "Kể lại một kỷ niệm sâu sắc về tình thầy trò", student: "Trần Quốc Thịnh", class: "5A", status: "da_nop" as const, score: 8.5 },
  { grade: 5, title: "Nêu suy nghĩ về trách nhiệm bảo vệ nguồn nước", student: "Lê Diệu Linh", class: "5A", status: "dang_tim_y" as const, score: 8.0 }
];

morePromptTitles.forEach((item, idx) => {
  const essayId = `ESSAY-${item.class}-${String(idx + 10).padStart(2, '0')}`;
  const studentId = `HS-${item.class}-${String(idx + 5).padStart(2, '0')}`;
  
  MOCK_ESSAYS.push({
    id: essayId,
    studentId,
    studentName: item.student,
    className: item.class,
    grade: item.grade as any,
    promptTitle: item.title,
    category: "Miêu tả",
    extraRequirements: ["Sử dụng từ ngữ gợi cảm", "Bày tỏ cảm xúc chân thành"],
    brainstormAnswers: [
      { question: "Em nhớ nhất điều gì khi nghĩ về đề bài này?", answer: `Em nhớ nét đẹp bình dị và cảm xúc ấm áp khi quan sát ${item.title.toLowerCase()}.` }
    ],
    outlineHistory: [],
    currentOutline: [
      { id: "s1", title: "Phần 1: Mở đầu", points: [`Giới thiệu về ${item.title.toLowerCase()}.`] },
      { id: "s2", title: "Phần 2: Nội dung chính", points: ["Miêu tả chi tiết đặc điểm nổi bật.", "Kể những hoạt động hoặc kỷ niệm đáng nhớ."] },
      { id: "s3", title: "Phần 3: Kết thúc", points: ["Cảm nghĩ và tình cảm của em."] }
    ],
    savedIdeas: ["trong sáng", "ấm áp", "thương mến"],
    originalContent: `Đây là bài viết luyện tập của em về chủ đề ${item.title.toLowerCase()}. Em đã quan sát rất kỹ và cố gắng lựa chọn những từ ngữ giản dị, trong trẻo nhất để gửi gắm tình cảm của mình. Mọi sự vật quanh em đều mang một nét đẹp riêng khi mình nhìn ngắm bằng tất cả sự yêu thương.`,
    version: 1,
    status: item.status,
    createdAt: "2026-10-17T09:00:00Z",
    updatedAt: "2026-10-19T10:00:00Z",
    submittedToTeacherAt: item.status === 'da_cham' || item.status === 'da_nop' ? "2026-10-18T16:00:00Z" : undefined,
    officialFeedback: item.status === 'da_cham' ? {
      understanding: "Hiểu đúng trọng tâm yêu cầu của đề.",
      content: "Nội dung trong sáng, phù hợp với lứa tuổi.",
      structure: "Bố cục mạch lạc, các ý liên kết tốt.",
      vocabulary: "Từ ngữ tự nhiên, gợi cảm.",
      emotion: "Cảm xúc chân thành.",
      goodSentences: [`Mọi sự vật quanh em đều mang một nét đẹp riêng khi mình nhìn ngắm bằng tất cả sự yêu thương.`],
      spelling: "Chính tả chuẩn xác.",
      grammar: "Đặt câu đúng quy tắc.",
      specialRequirements: "Đạt yêu cầu.",
      improvements: ["Cố gắng thêm các chi tiết quan sát độc đáo hơn nữa nhé!"],
      suggestedScore: item.score,
      officialScore: item.score,
      teacherNote: "Cô rất hài lòng với sự chăm chỉ và tiến bộ của em trong bài viết này!",
      teacherReviewedAt: "2026-10-19T10:00:00Z"
    } : undefined,
    studentReactions: [],
    teacherMessages: [],
    wordCount: 85,
    sentenceCount: 5
  });
});
