import type { Food } from './foods';

export type Language = 'vi' | 'en';

export const copy = {
  vi: {
    tiers: ['QUỐC DÂN', 'HIẾM', 'CỰC PHẨM', 'TỐI MẬT', '★ ĐẶC BIỆT'],
    title: 'Mở hòm ăn trưa', counterPrefix: 'Đã ghi nhận', counterSuffix: 'hòm',
    counterTitle: 'Lượt quay hoàn tất được ghi nhận trên website này', caseLabel: 'Mở hòm món ăn',
    soundOn: 'Âm thanh bật', soundOff: 'Âm thanh tắt', turnSoundOff: 'Tắt âm thanh', turnSoundOn: 'Bật âm thanh',
    github: 'Mở mã nguồn trên GitHub', starsPending: 'chưa tải', language: 'Switch to English',
    spend: 'Mức chi thường ngày', custom: 'Tuỳ chỉnh', customSpend: 'Mức chi tuỳ chỉnh (nghìn đồng)',
    thousandPerMeal: 'nghìn / bữa', spendError: 'Nhập từ 30 đến 180 nghìn.', vegetarianPool: 'Pool hiện tại: trung bình',
    vegetarianOnly: 'Chỉ ăn chay', vegetarian: 'Ăn chay', opening: 'ĐANG MỞ HÒM…', openAgain: 'MỞ LẠI', open: 'MỞ HÒM',
    newItem: 'VẬT PHẨM MỚI', referencePrice: 'Giá tham khảo', perPerson: '/ người', find: 'TÌM QUÁN', continue: 'TIẾP TỤC', nearby: 'gần đây',
    whatsInside: 'TRONG HÒM CÓ GÌ?', items: 'Vật phẩm trong hòm', mystery: '★ MÓN BÍ ẨN', mysteryAlt: 'Món bí ẩn hạng vàng',
    showMore: 'Hiện thêm', dishes: 'món',
    footer: 'Fan-made · SFX: Valve /', lunchDish: 'Món ăn trưa', vegetarianDish: 'Chay',
  },
  en: {
    tiers: ['MIL-SPEC', 'RESTRICTED', 'CLASSIFIED', 'COVERT', '★ SPECIAL ITEM'],
    title: 'Open a lunch case', counterPrefix: 'Recorded', counterSuffix: 'cases',
    counterTitle: 'Completed spins recorded on this website', caseLabel: 'Open a lunch case',
    soundOn: 'Sound on', soundOff: 'Sound off', turnSoundOff: 'Mute sound', turnSoundOn: 'Enable sound',
    github: 'Open source on GitHub', starsPending: 'not loaded', language: 'Chuyển sang tiếng Việt',
    spend: 'Usual lunch spend', custom: 'Custom', customSpend: 'Custom spend (thousand VND)',
    thousandPerMeal: 'thousand VND / meal', spendError: 'Enter 30–180 thousand VND.', vegetarianPool: 'Current pool average',
    vegetarianOnly: 'Vegetarian only', vegetarian: 'Vegetarian', opening: 'OPENING CASE…', openAgain: 'OPEN AGAIN', open: 'OPEN CASE',
    newItem: 'NEW ITEM', referencePrice: 'Typical price', perPerson: '/ person', find: 'FIND NEARBY', continue: 'CONTINUE', nearby: 'near me',
    whatsInside: "WHAT'S IN THE CASE?", items: 'Items in this case', mystery: '★ MYSTERY DISH', mysteryAlt: 'Gold-tier mystery dish',
    showMore: 'Show', dishes: 'more dishes',
    footer: 'Fan-made · SFX: Valve /', lunchDish: 'Lunch dish', vegetarianDish: 'Vegetarian',
  },
} as const;

const englishNames: Record<number, string> = {
  0:'Broken rice with pork',1:'Beef pho',2:'Banh mi',3:'Grilled pork noodles',4:'Salmon sushi',5:'Pizza',6:'Fried chicken',7:'Vegetarian rice plate',8:'Bibimbap',
  9:'Hoi An chicken rice',10:'Hue beef noodle soup',11:'Hu tieu noodle soup',12:'Quang noodles',13:'Grilled pork vermicelli',14:'Steamed rice rolls',15:'Tofu noodles with shrimp paste',16:'Beef & pickle fried rice',17:'Shaking beef',18:'Vietnamese crispy pancake',19:'Crab red noodle soup',20:'Beef stir-fried noodles',21:'Fish noodle soup',22:'Fresh spring rolls',23:'Pork rib congee',
  24:'Ramen',25:'Udon',26:'Japanese curry rice',27:'Tteokbokki',28:'Beef burger',29:'Spaghetti bolognese',30:'Pad Thai',31:'Tom yum noodles',32:'Vegetarian mushroom hotpot',33:'Vegetarian mushroom noodles',34:'Vegetarian banh mi',35:'Vegetarian spring rolls',36:'Vietnamese rice plate',
  39:'Crispy chicken rice',42:'Crab tomato noodle soup',43:'Crab thick noodle soup',44:'Vietnamese steak & eggs',45:'Teriyaki chicken rice',46:'Tonkatsu rice',47:'Seafood fried rice',48:'Braised duck noodles',49:'Kimbap',50:'Korean mixed noodles',51:'Chicken breast salad',52:'Creamy bacon pasta',53:'Beef lasagna',54:'Cheeseburger & fries',55:'Pepperoni pizza',56:'Gyudon beef bowl',57:'Grilled mackerel rice',58:'Japanese soba',59:'Thai curry rice',60:'Tuna salad',61:'Quinoa chickpea salad',62:'Beef steak',63:'Pan-seared salmon',64:'Japanese eel rice',65:'Korean grilled beef rice',66:'Salmon teriyaki rice',67:'Salmon poke',68:'BBQ ribs',69:'Seafood pizza',70:'Seafood pasta',71:'Personal beef hotpot',
  72:'Chicken pho',73:'Pho rolls',74:'Pork meatball noodle soup',75:'Duck & bamboo noodle soup',76:'Southern beef noodle salad',77:'Fermented fish noodle soup',78:'Vegetarian noodle bowl',79:'Pork knuckle thick noodle soup',80:'Chicken glass noodle soup',81:'Eel glass noodle soup',82:'Duck congee',83:'Pork offal congee',84:'Roast pork rice vermicelli sheets',85:'Grilled pork sausage rolls',86:'Dim sum',87:'Wonton noodles',88:'Taiwanese beef noodles',89:'Crispy stir-fried noodles',90:'Singapore claypot rice',91:'Hainanese chicken rice',92:'Oyakodon chicken & egg rice',93:'Tempura rice bowl',94:'Spicy Korean noodles',95:'Jajangmyeon black bean noodles',96:'Naengmyeon cold noodles',97:'Kimchi stew with rice',98:'Soft tofu stew with rice',99:'Korean cheese chicken',100:'Kimchi fried rice',101:'Personal Thai hotpot',102:'Personal sukiyaki hotpot',103:'Indian curry & naan',104:'Chicken biryani',105:'Okonomiyaki',106:'Sandwich',107:'Doner kebab',108:'Chicken wrap',109:'Burrito',110:'Tacos',111:'Quesadilla',112:'Fish & chips',113:'Roast chicken & potatoes',114:'Mac & cheese',115:'Pesto pasta',116:'Salmon pasta',117:'Risotto',118:'Gnocchi',119:'Falafel & pita',
  120:'Beef macaroni stir-fry',121:'Chicken congee',122:'Vietnamese beef stew & banh mi',123:'Savory sticky rice',124:'Vietnamese skillet banh mi',125:'Char siu rice',126:'Roast duck rice',127:'Char siu noodles',128:'Stir-fried udon',129:'Chicken burger & fries',130:'Tomato mascarpone pasta',131:'Stir-fried glass noodles',
};

export function foodName(food: Food, language: Language) {
  return language === 'en' ? englishNames[food.image] ?? food.name : food.name;
}

export function foodSubtitle(food: Food, language: Language) {
  if (language === 'vi') return food.sub;
  return food.veg ? copy.en.vegetarianDish : copy.en.lunchDish;
}

export function priceLabel(thousands: number | string, language: Language, approximate = false) {
  const value = Number(thousands) * 1000;
  const formatted = language === 'en' ? `₫${new Intl.NumberFormat('en-US').format(value)}` : `${new Intl.NumberFormat('vi-VN').format(value)}đ`;
  return `${approximate ? '~' : ''}${formatted}`;
}
