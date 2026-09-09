import { priceRarity } from './case-mechanics';
export type Category = 'com' | 'pho-bun' | 'mi' | 'mon-kho' | 'chao-lau' | 'salad';
export const CATEGORIES: readonly { id: Category; vi: string; en: string }[] = [
  { id: 'com', vi: 'Cơm', en: 'Rice' },
  { id: 'pho-bun', vi: 'Phở & Bún', en: 'Pho & Noodles' },
  { id: 'mi', vi: 'Mì', en: 'Noodles & Pasta' },
  { id: 'mon-kho', vi: 'Món khô', en: 'Dry dishes' },
  { id: 'chao-lau', vi: 'Cháo & Lẩu', en: 'Congee & Hotpot' },
  { id: 'salad', vi: 'Salad', en: 'Salad' },
];
export type Food={customId?:string;name:string;sub:string;price:number;rarity:number;image:number;veg?:boolean;quip:string;cat:Category};
const categoryMap: Record<number, Category> = {
  0:'com',1:'pho-bun',2:'mon-kho',3:'pho-bun',4:'mon-kho',5:'mon-kho',6:'mon-kho',7:'com',8:'com',
  9:'com',10:'pho-bun',11:'pho-bun',12:'mi',13:'pho-bun',14:'mon-kho',15:'pho-bun',16:'com',17:'com',
  18:'mon-kho',19:'pho-bun',20:'mi',21:'pho-bun',22:'mon-kho',23:'chao-lau',24:'mi',25:'mi',26:'com',
  27:'mon-kho',28:'mon-kho',29:'mi',30:'mi',31:'mi',32:'chao-lau',33:'mi',34:'mon-kho',35:'mon-kho',
  36:'com',39:'com',42:'pho-bun',43:'pho-bun',44:'mon-kho',45:'com',46:'com',47:'com',48:'mi',
  49:'mon-kho',50:'mi',51:'salad',52:'mi',53:'mi',54:'mon-kho',55:'mon-kho',56:'com',57:'com',
  58:'mi',59:'com',60:'salad',61:'salad',62:'mon-kho',63:'mon-kho',64:'com',65:'com',66:'com',
  67:'salad',68:'mon-kho',69:'mon-kho',70:'mi',71:'chao-lau',72:'pho-bun',73:'pho-bun',74:'pho-bun',
  75:'pho-bun',76:'pho-bun',77:'pho-bun',78:'pho-bun',79:'pho-bun',80:'pho-bun',81:'pho-bun',
  82:'chao-lau',83:'chao-lau',84:'mon-kho',85:'mon-kho',86:'mon-kho',87:'mi',88:'mi',89:'mi',
  90:'com',91:'com',92:'com',93:'com',94:'mi',95:'mi',96:'mi',97:'com',98:'com',99:'mon-kho',
  100:'com',101:'chao-lau',102:'chao-lau',103:'mon-kho',104:'com',105:'mon-kho',106:'mon-kho',
  107:'mon-kho',108:'mon-kho',109:'mon-kho',110:'mon-kho',111:'mon-kho',112:'mon-kho',113:'mon-kho',
  114:'mi',115:'mi',116:'mi',117:'com',118:'mi',119:'mon-kho',120:'mi',121:'chao-lau',122:'chao-lau',
  123:'com',124:'mon-kho',125:'com',126:'com',127:'mi',128:'mi',129:'mon-kho',130:'mi',131:'mi',
};
// Approximate lunch portion prices in thousands of VND, not restaurant quotes.
export const foods:Food[]=[
  {
    "name": "Cơm tấm",
    "sub": "Sườn bì chả • Việt Nam",
    "price": 45,
    "image": 0,
    "quip": "Sườn có thể gãy. Kèo này thì không."
  },
  {
    "name": "Phở bò",
    "sub": "Tái nạm • Việt Nam",
    "price": 55,
    "image": 1,
    "quip": "Đời có thể nhạt. Nước phở thì không."
  },
  {
    "name": "Bánh mì",
    "sub": "Thịt nướng • Việt Nam",
    "price": 25,
    "image": 2,
    "quip": "Vũ khí cận chiến của dân văn phòng."
  },
  {
    "name": "Bún chả",
    "sub": "Chả nướng • Việt Nam",
    "price": 50,
    "image": 3,
    "quip": "Một pha gắp chả đi vào lòng người."
  },
  {
    "name": "Sushi cá hồi",
    "sub": "Cá hồi • Nhật Bản",
    "price": 150,
    "image": 4,
    "quip": "Legendary drop. Ví bạn vừa disconnect."
  },
  {
    "name": "Pizza",
    "sub": "Phô mai • Ý",
    "price": 100,
    "image": 5,
    "quip": "Một miếng cho bạn. Phần còn lại cũng vậy."
  },
  {
    "name": "Gà rán",
    "sub": "Giòn cay • Quốc tế",
    "price": 65,
    "image": 6,
    "quip": "Winner winner, chicken lunch."
  },
  {
    "name": "Cơm chay",
    "sub": "Đậu hũ & rau • Việt Nam",
    "price": 35,
    "image": 7,
    "veg": true,
    "quip": "Ăn chay nhưng chiến hết mình."
  },
  {
    "name": "Bibimbap",
    "sub": "Cơm trộn • Hàn Quốc",
    "price": 85,
    "image": 8,
    "quip": "Trộn cơm. Đừng trộn deadline."
  },
  {
    "name": "Cơm gà Hội An",
    "sub": "Món ăn trưa",
    "price": 45,
    "image": 9,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Bún bò Huế",
    "sub": "Món ăn trưa",
    "price": 50,
    "image": 10,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Hủ tiếu",
    "sub": "Món ăn trưa",
    "price": 40,
    "image": 11,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Mì Quảng",
    "sub": "Món ăn trưa",
    "price": 45,
    "image": 12,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Bún thịt nướng",
    "sub": "Món ăn trưa",
    "price": 40,
    "image": 13,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Bánh cuốn",
    "sub": "Món ăn trưa",
    "price": 35,
    "image": 14,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Bún đậu mắm tôm",
    "sub": "Món ăn trưa",
    "price": 55,
    "image": 15,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Cơm rang dưa bò",
    "sub": "Món ăn trưa",
    "price": 50,
    "image": 16,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Bò lúc lắc",
    "sub": "Món ăn trưa",
    "price": 85,
    "image": 17,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Bánh xèo",
    "sub": "Món ăn trưa",
    "price": 50,
    "image": 18,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Bánh đa cua",
    "sub": "Món ăn trưa",
    "price": 45,
    "image": 19,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Mì xào bò",
    "sub": "Món ăn trưa",
    "price": 45,
    "image": 20,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Bún cá",
    "sub": "Món ăn trưa",
    "price": 40,
    "image": 21,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Gỏi cuốn",
    "sub": "Món ăn trưa",
    "price": 35,
    "image": 22,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Cháo sườn",
    "sub": "Món ăn trưa",
    "price": 25,
    "image": 23,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Ramen",
    "sub": "Món ăn trưa",
    "price": 100,
    "image": 24,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Udon",
    "sub": "Món ăn trưa",
    "price": 85,
    "image": 25,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Cơm cà ri Nhật",
    "sub": "Món ăn trưa",
    "price": 90,
    "image": 26,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Tteokbokki",
    "sub": "Món ăn trưa",
    "price": 65,
    "image": 27,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Burger bò",
    "sub": "Món ăn trưa",
    "price": 65,
    "image": 28,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Mì Ý bò bằm",
    "sub": "Món ăn trưa",
    "price": 80,
    "image": 29,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Pad Thai",
    "sub": "Món ăn trưa",
    "price": 75,
    "image": 30,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Mì Tom Yum",
    "sub": "Món ăn trưa",
    "price": 80,
    "image": 31,
    "veg": false,
    "quip": ""
  },
  {
    "name": "Lẩu nấm chay",
    "sub": "Chay",
    "price": 120,
    "image": 32,
    "veg": true,
    "quip": ""
  },
  {
    "name": "Mì nấm chay",
    "sub": "Chay",
    "price": 40,
    "image": 33,
    "veg": true,
    "quip": ""
  },
  {
    "name": "Bánh mì chay",
    "sub": "Chay",
    "price": 25,
    "image": 34,
    "veg": true,
    "quip": ""
  },
  {
    "name": "Gỏi cuốn chay",
    "sub": "Chay",
    "price": 35,
    "image": 35,
    "veg": true,
    "quip": ""
  },
  {
    "name": "Cơm bình dân",
    "price": 40,
    "image": 36,
    "sub": "Chọn món mặn, rau & canh",
    "quip": ""
  },
  {
    "name": "Cơm gà xối mỡ",
    "price": 55,
    "image": 39,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Bún riêu",
    "price": 45,
    "image": 42,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Bánh canh cua",
    "price": 60,
    "image": 43,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Bò né",
    "price": 75,
    "image": 44,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Cơm gà teriyaki",
    "price": 85,
    "image": 45,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Cơm heo chiên xù",
    "price": 95,
    "image": 46,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Cơm chiên hải sản",
    "price": 85,
    "image": 47,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Mì vịt tiềm",
    "price": 95,
    "image": 48,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Kimbap",
    "price": 70,
    "image": 49,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Mì trộn Hàn Quốc",
    "price": 75,
    "image": 50,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Salad ức gà",
    "price": 85,
    "image": 51,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Mì Ý sốt kem bacon",
    "price": 115,
    "image": 52,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Lasagna bò",
    "price": 125,
    "image": 53,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Burger bò phô mai & khoai tây",
    "price": 120,
    "image": 54,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Pizza pepperoni",
    "price": 120,
    "image": 55,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Cơm bò gyudon",
    "price": 110,
    "image": 56,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Cơm cá saba nướng",
    "price": 110,
    "image": 57,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Mì soba Nhật",
    "price": 110,
    "image": 58,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Cơm cà ri Thái",
    "price": 110,
    "image": 59,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Salad cá ngừ",
    "price": 110,
    "image": 60,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Salad quinoa đậu gà",
    "price": 115,
    "image": 61,
    "veg": true,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Bò bít tết",
    "price": 180,
    "image": 62,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Cá hồi áp chảo",
    "price": 190,
    "image": 63,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Cơm lươn Nhật",
    "price": 180,
    "image": 64,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Cơm bò nướng Hàn",
    "price": 150,
    "image": 65,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Cơm cá hồi teriyaki",
    "price": 150,
    "image": 66,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Poke cá hồi",
    "price": 160,
    "image": 67,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Sườn nướng BBQ",
    "price": 230,
    "image": 68,
    "sub": "Kèm cơm hoặc khoai tây • Phần một người",
    "quip": ""
  },
  {
    "name": "Pizza hải sản",
    "price": 160,
    "image": 69,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Mì Ý hải sản",
    "price": 160,
    "image": 70,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Lẩu bò cá nhân",
    "price": 160,
    "image": 71,
    "sub": "Phần ăn trưa / người",
    "quip": ""
  },
  {
    "name": "Phở gà",
    "price": 55,
    "sub": "Tô thường • Việt Nam",
    "veg": false,
    "image": 72,
    "quip": ""
  },
  {
    "name": "Phở cuốn",
    "price": 70,
    "sub": "Phần 10 cuốn • Việt Nam",
    "veg": false,
    "image": 73,
    "quip": ""
  },
  {
    "name": "Bún mọc",
    "price": 45,
    "sub": "Tô thường • Việt Nam",
    "veg": false,
    "image": 74,
    "quip": ""
  },
  {
    "name": "Bún măng vịt",
    "price": 60,
    "sub": "Tô có thịt vịt • Việt Nam",
    "veg": false,
    "image": 75,
    "quip": ""
  },
  {
    "name": "Bún bò Nam Bộ",
    "price": 60,
    "sub": "Bún trộn bò • Việt Nam",
    "veg": false,
    "image": 76,
    "quip": ""
  },
  {
    "name": "Bún mắm",
    "price": 65,
    "sub": "Tô hải sản • Việt Nam",
    "veg": false,
    "image": 77,
    "quip": ""
  },
  {
    "name": "Bún chay",
    "price": 35,
    "sub": "Đậu hũ & rau • Việt Nam",
    "veg": true,
    "image": 78,
    "quip": ""
  },
  {
    "name": "Bánh canh giò heo",
    "price": 50,
    "sub": "Tô thường • Việt Nam",
    "veg": false,
    "image": 79,
    "quip": ""
  },
  {
    "name": "Miến gà",
    "price": 55,
    "sub": "Tô thường • Việt Nam",
    "veg": false,
    "image": 80,
    "quip": ""
  },
  {
    "name": "Miến lươn",
    "price": 65,
    "sub": "Tô thường • Việt Nam",
    "veg": false,
    "image": 81,
    "quip": ""
  },
  {
    "name": "Cháo vịt",
    "price": 55,
    "sub": "Phần có thịt vịt • Việt Nam",
    "veg": false,
    "image": 82,
    "quip": ""
  },
  {
    "name": "Cháo lòng",
    "price": 40,
    "sub": "Phần có lòng • Việt Nam",
    "veg": false,
    "image": 83,
    "quip": ""
  },
  {
    "name": "Bánh hỏi heo quay",
    "price": 50,
    "sub": "Một phần • Việt Nam",
    "veg": false,
    "image": 84,
    "quip": ""
  },
  {
    "name": "Nem nướng",
    "price": 55,
    "sub": "Phần cuốn đủ bữa • Việt Nam",
    "veg": false,
    "image": 85,
    "quip": ""
  },
  {
    "name": "Dimsum",
    "price": 130,
    "sub": "Khoảng 3 xửng / người",
    "veg": false,
    "image": 86,
    "quip": ""
  },
  {
    "name": "Mì hoành thánh",
    "price": 60,
    "sub": "Tô mì & hoành thánh",
    "veg": false,
    "image": 87,
    "quip": ""
  },
  {
    "name": "Mì bò Đài Loan",
    "price": 85,
    "sub": "Bò hầm & mì • Đài Loan",
    "veg": false,
    "image": 88,
    "quip": ""
  },
  {
    "name": "Mì xào giòn",
    "price": 70,
    "sub": "Hải sản & rau củ",
    "veg": false,
    "image": 89,
    "quip": ""
  },
  {
    "name": "Cơm niêu Singapore",
    "price": 85,
    "sub": "Một niêu / người",
    "veg": false,
    "image": 90,
    "quip": ""
  },
  {
    "name": "Cơm gà Hải Nam",
    "price": 75,
    "sub": "Gà luộc & cơm thơm",
    "veg": false,
    "image": 91,
    "quip": ""
  },
  {
    "name": "Cơm gà trứng Nhật",
    "price": 100,
    "sub": "Oyakodon • Nhật Bản",
    "veg": false,
    "image": 92,
    "quip": ""
  },
  {
    "name": "Cơm tempura",
    "price": 130,
    "sub": "Tendon • Nhật Bản",
    "veg": false,
    "image": 93,
    "quip": ""
  },
  {
    "name": "Mì cay Hàn Quốc",
    "price": 65,
    "sub": "Một tô • Hàn Quốc",
    "veg": false,
    "image": 94,
    "quip": ""
  },
  {
    "name": "Mì tương đen",
    "price": 70,
    "sub": "Jajangmyeon • Hàn Quốc",
    "veg": false,
    "image": 95,
    "quip": ""
  },
  {
    "name": "Mì lạnh Hàn Quốc",
    "price": 95,
    "sub": "Naengmyeon • Hàn Quốc",
    "veg": false,
    "image": 96,
    "quip": ""
  },
  {
    "name": "Canh kimchi kèm cơm",
    "price": 85,
    "sub": "Kimchi jjigae • Hàn Quốc",
    "veg": false,
    "image": 97,
    "quip": ""
  },
  {
    "name": "Canh đậu hũ non kèm cơm",
    "price": 85,
    "sub": "Sundubu jjigae • Hàn Quốc",
    "veg": false,
    "image": 98,
    "quip": ""
  },
  {
    "name": "Gà phô mai Hàn Quốc",
    "price": 120,
    "sub": "Phần một người",
    "veg": false,
    "image": 99,
    "quip": ""
  },
  {
    "name": "Cơm chiên kimchi",
    "price": 65,
    "sub": "Kimchi bokkeumbap • Hàn Quốc",
    "veg": false,
    "image": 100,
    "quip": ""
  },
  {
    "name": "Lẩu Thái một người",
    "price": 130,
    "sub": "Kèm bún hoặc mì",
    "veg": false,
    "image": 101,
    "quip": ""
  },
  {
    "name": "Lẩu sukiyaki một người",
    "price": 220,
    "sub": "Thịt, rau & mì • Nhật Bản",
    "veg": false,
    "image": 102,
    "quip": ""
  },
  {
    "name": "Cà ri Ấn Độ & naan",
    "price": 220,
    "sub": "Cà ri gà kèm bánh naan",
    "veg": false,
    "image": 103,
    "quip": ""
  },
  {
    "name": "Cơm biryani",
    "price": 190,
    "sub": "Cơm gia vị & gà • Ấn Độ",
    "veg": false,
    "image": 104,
    "quip": ""
  },
  {
    "name": "Bánh xèo Nhật",
    "price": 110,
    "sub": "Okonomiyaki • Nhật Bản",
    "veg": false,
    "image": 105,
    "quip": ""
  },
  {
    "name": "Sandwich",
    "price": 80,
    "sub": "Phần bánh kẹp đủ bữa",
    "veg": false,
    "image": 106,
    "quip": ""
  },
  {
    "name": "Bánh mì kebab",
    "price": 35,
    "sub": "Doner kebab • Thổ Nhĩ Kỳ",
    "veg": false,
    "image": 107,
    "quip": ""
  },
  {
    "name": "Bánh cuộn gà",
    "price": 95,
    "sub": "Chicken wrap",
    "veg": false,
    "image": 108,
    "quip": ""
  },
  {
    "name": "Burrito",
    "price": 150,
    "sub": "Cuộn cơm, đậu & thịt • Mexico",
    "veg": false,
    "image": 109,
    "quip": ""
  },
  {
    "name": "Taco",
    "price": 150,
    "sub": "Phần 3 bánh • Mexico",
    "veg": false,
    "image": 110,
    "quip": ""
  },
  {
    "name": "Quesadilla",
    "price": 140,
    "sub": "Phô mai & gà • Mexico",
    "veg": false,
    "image": 111,
    "quip": ""
  },
  {
    "name": "Fish & chips",
    "price": 170,
    "sub": "Cá chiên & khoai tây",
    "veg": false,
    "image": 112,
    "quip": ""
  },
  {
    "name": "Gà nướng kèm khoai tây",
    "price": 140,
    "sub": "Phần một người",
    "veg": false,
    "image": 113,
    "quip": ""
  },
  {
    "name": "Mac & cheese",
    "price": 150,
    "sub": "Nui phô mai • Phần chính",
    "veg": false,
    "image": 114,
    "quip": ""
  },
  {
    "name": "Mì Ý pesto",
    "price": 170,
    "sub": "Húng quế & gà • Ý",
    "veg": false,
    "image": 115,
    "quip": ""
  },
  {
    "name": "Mì Ý cá hồi",
    "price": 230,
    "sub": "Sốt kem cá hồi • Ý",
    "veg": false,
    "image": 116,
    "quip": ""
  },
  {
    "name": "Cơm risotto",
    "price": 260,
    "sub": "Cơm Ý • Phần chính",
    "veg": false,
    "image": 117,
    "quip": ""
  },
  {
    "name": "Gnocchi",
    "price": 250,
    "sub": "Bánh khoai tây kiểu Ý",
    "veg": false,
    "image": 118,
    "quip": ""
  },
  {
    "name": "Falafel kèm pita",
    "price": 150,
    "sub": "Đậu gà, rau & bánh pita",
    "veg": true,
    "image": 119,
    "quip": ""
  },
{
  "name": "Nui xào bò",
  "price": 50,
  "sub": "Nui, bò & rau • Việt Nam",
  "quip": "Nui deadline lại. Ăn trước đã.",
  "image": 120
},
{
  "name": "Cháo gà",
  "price": 45,
  "sub": "Gà xé & hành tiêu • Việt Nam",
  "quip": "Một bát hồi máu giữa giờ làm.",
  "image": 121
},
{
  "name": "Bò kho bánh mì",
  "price": 65,
  "sub": "Bò hầm & bánh mì • Việt Nam",
  "quip": "Chấm bánh mì. Đừng chấm công muộn.",
  "image": 122
},
{
  "name": "Xôi mặn",
  "price": 35,
  "sub": "Gà, thịt hoặc chả • Việt Nam",
  "quip": "Dẻo dai đến hết ca chiều.",
  "image": 123
},
{
  "name": "Bánh mì chảo",
  "price": 45,
  "sub": "Trứng, pa tê & xúc xích • Việt Nam",
  "quip": "Nóng hơn cả nhóm chat công ty.",
  "image": 124
},
{
  "name": "Cơm xá xíu",
  "price": 55,
  "sub": "Thịt xá xíu & cơm • Món Hoa",
  "quip": "Xá xíu một chút. No cả buổi.",
  "image": 125
},
{
  "name": "Cơm vịt quay",
  "price": 75,
  "sub": "Vịt quay & cơm • Món Hoa",
  "quip": "Da giòn. Tinh thần cũng lên.",
  "image": 126
},
{
  "name": "Mì xá xíu",
  "price": 55,
  "sub": "Mì trứng & thịt xá xíu • Món Hoa",
  "quip": "Sợi mì dài hơn thời gian nghỉ trưa.",
  "image": 127
},
{
  "name": "Mì udon xào",
  "price": 110,
  "sub": "Hải sản & rau • Nhật Bản",
  "quip": "Sợi to. Kèo thơm.",
  "image": 128
},
{
  "name": "Burger gà & khoai tây",
  "price": 80,
  "sub": "Gà giòn & khoai tây • Quốc tế",
  "quip": "Cắn một phát. Hết phân vân.",
  "image": 129
},
{
  "name": "Mì Ý sốt cà chua & phô mai",
  "price": 170,
  "sub": "Cà chua & mascarpone • Ý",
  "quip": "Sốt cà chua cứu một ngày nhạt nhẽo.",
  "image": 130
},
{
  "name": "Miến xào",
  "price": 55,
  "sub": "Thịt & rau • Việt Nam",
  "quip": "Miến này không phải miếng mồi deadline.",
  "image": 131
}
].map(food=>({...food,rarity:priceRarity(food.price),cat:categoryMap[food.image]??'mon-kho' as Category}));

