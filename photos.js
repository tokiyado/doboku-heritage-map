// 同梱写真（Wikimedia Commons 由来と、国土交通省ウェブサイトの写真1枚＝PDL1.0）。1遺産に複数枚あるときは先頭が一覧用の代表写真。
// 作者・題名・ライセンス・出典は THIRD-PARTY-NOTICES.md にも記載。土木学会の写真は掲載しない。
// facility は複数の施設からなる遺産で、どの施設の写真かを示す（空なら遺産全体）。
// creditLabel は表示の頭の言葉（省略時は「写真」。国土交通省の写真は利用規約に合わせて「出典」）。
const LOCAL_PHOTOS = {
  "2000_2": [
    {"src": "photos/2000_2-1.jpg", "thumb": "photos/2000_2-1-thumb.jpg", "by": "Ebiebi2", "title": "Nobiru Port Ruins 3", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Nobiru_Port_Ruins_3.jpg", "facility": "野蒜築港跡"},
    {"src": "photos/2000_2-2.jpg", "thumb": "photos/2000_2-2-thumb.jpg", "by": "Ebiebi2", "title": "Ishii lock 2", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Ishii_lock_2.jpg", "facility": "石井閘門"},
    {"src": "photos/2000_2-3.jpg", "thumb": "photos/2000_2-3-thumb.jpg", "by": "cora_cola 茶々丸", "title": "鳴瀬川と松島湾を結ぶ東名運河（とうなうんが）です。 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E9%B3%B4%E7%80%AC%E5%B7%9D%E3%81%A8%E6%9D%BE%E5%B3%B6%E6%B9%BE%E3%82%92%E7%B5%90%E3%81%B6%E6%9D%B1%E5%90%8D%E9%81%8B%E6%B2%B3%EF%BC%88%E3%81%A8%E3%81%86%E3%81%AA%E3%81%86%E3%82%93%E3%81%8C%EF%BC%89%E3%81%A7%E3%81%99%E3%80%82_-_panoramio.jpg", "facility": "東名運河"},
    {"src": "photos/2000_2-4.jpg", "thumb": "photos/2000_2-4-thumb.jpg", "by": "Los688", "title": "Teizanbori2", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Teizanbori2.JPG", "facility": "貞山運河"}
  ],
  "2000_3": [
    {"src": "photos/2000_3-1.jpg", "thumb": "photos/2000_3-1-thumb.jpg", "by": "jmho", "title": "Eitaibashi2", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Eitaibashi2.JPG", "facility": "永代橋"},
    {"src": "photos/2000_3-2.jpg", "thumb": "photos/2000_3-2-thumb.jpg", "by": "Yuichi Kosio", "title": "The ship 'Dokan' with Eitai Bridge behind it - Oct 22, 2012", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:The_ship_%27Dokan%27_with_Eitai_Bridge_behind_it_-_Oct_22,_2012.jpg", "facility": "永代橋"},
    {"src": "photos/2000_3-3.jpg", "thumb": "photos/2000_3-3-thumb.jpg", "by": "T.Kiya from Japan", "title": "Kiyosu Bridge 2015-05-30 (18097974009)", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Kiyosu_Bridge_2015-05-30_(18097974009).jpg", "facility": "清洲橋"},
    {"src": "photos/2000_3-4.jpg", "thumb": "photos/2000_3-4-thumb.jpg", "by": "経済特区", "title": "清洲橋(20210829) 03", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%B8%85%E6%B4%B2%E6%A9%8B(20210829)_03.jpg", "facility": "清洲橋"}
  ],
  "2000_4": [
    {"src": "sarushima.jpg", "thumb": "sarushima-thumb.jpg", "by": "Mobius One", "title": "Sarushima Fortified Pathway", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sarushima_Fortified_Pathway.jpg", "facility": ""}
  ],
  "2000_7": [
    {"src": "photos/2000_7-1.jpg", "thumb": "photos/2000_7-1-thumb.jpg", "by": "Mc681", "title": "Sakuranomiya-Bridge in front of Osaka-Castle", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Sakuranomiya-Bridge_in_front_of_Osaka-Castle.jpg", "facility": "桜宮橋"},
    {"src": "photos/2000_7-2.jpg", "thumb": "photos/2000_7-2-thumb.jpg", "by": "Mc681", "title": "Sakuranomiya Bridge in 201504", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sakuranomiya_Bridge_in_201504.JPG", "facility": "桜宮橋"},
    {"src": "photos/2000_7-3.jpg", "thumb": "photos/2000_7-3-thumb.jpg", "by": "Nkns", "title": "Tennmabashi 01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tennmabashi_01.jpg", "facility": "天満橋"},
    {"src": "photos/2000_7-4.jpg", "thumb": "photos/2000_7-4-thumb.jpg", "by": "Kansai explorer", "title": "Tenmabashi01", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tenmabashi01.jpg", "facility": "天満橋"},
    {"src": "photos/2000_7-5.jpg", "thumb": "photos/2000_7-5-thumb.jpg", "by": "Mc681", "title": "Tenjimbashi Bridge in 201406", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tenjimbashi_Bridge_in_201406.jpg", "facility": "天神橋"},
    {"src": "photos/2000_7-6.jpg", "thumb": "photos/2000_7-6-thumb.jpg", "by": "ignis", "title": "Tenjinbashi Osaka JPN 001", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tenjinbashi_Osaka_JPN_001.jpg", "facility": "天神橋"},
    {"src": "photos/2000_7-7.jpg", "thumb": "photos/2000_7-7-thumb.jpg", "by": "Ogiyoshisan", "title": "Ooebashi DSCN3493 20121012", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ooebashi_DSCN3493_20121012.JPG", "facility": "大江橋"},
    {"src": "photos/2000_7-8.jpg", "thumb": "photos/2000_7-8-thumb.jpg", "by": "BJP039", "title": "Oebashi bridge", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Oebashi_bridge.jpg", "facility": "大江橋"},
    {"src": "photos/2000_7-9.jpg", "thumb": "photos/2000_7-9-thumb.jpg", "by": "Oilstreet", "title": "Nakanoshima Osaka Japan02", "license": "CC BY 2.5", "licenseUrl": "https://creativecommons.org/licenses/by/2.5/", "source": "https://commons.wikimedia.org/wiki/File:Nakanoshima_Osaka_Japan02.jpg", "facility": "淀屋橋"},
    {"src": "photos/2000_7-10.jpg", "thumb": "photos/2000_7-10-thumb.jpg", "by": "Maechan0360", "title": "淀屋橋 02", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%B7%80%E5%B1%8B%E6%A9%8B_02.JPG", "facility": "淀屋橋"}
  ],
  "2000_8": [
    {"src": "photos/2000_8-1.jpg", "thumb": "photos/2000_8-1-thumb.jpg", "by": "Aimaimyi", "title": "Kyobashi (Okayama) -01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kyobashi_(Okayama)_-01.jpg", "facility": ""}
  ],
  "2000_10": [
    {"src": "photos/2000_10-1.jpg", "thumb": "photos/2000_10-1-thumb.jpg", "by": "Hiroshi Nakai", "title": "South Kawachi Bridge 1020164", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:South_Kawachi_Bridge_1020164.jpg", "facility": "南河内橋"},
    {"src": "photos/2000_10-2.jpg", "thumb": "photos/2000_10-2-thumb.jpg", "by": "sk01", "title": "南河内橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%8D%97%E6%B2%B3%E5%86%85%E6%A9%8B_-_panoramio.jpg", "facility": "南河内橋"}
  ],
  "2001_1": [
    {"src": "photos/2001_1-1.jpg", "thumb": "photos/2001_1-1-thumb.jpg", "by": "掬茶", "title": "Fountain in Hakodate Motomachi water supply facility", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Fountain_in_Hakodate_Motomachi_water_supply_facility.jpg", "facility": "函館市元町配水場"},
    {"src": "photos/2001_1-2.jpg", "thumb": "photos/2001_1-2-thumb.jpg", "by": "河川一等兵", "title": "Sasanagare Dam", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sasanagare_Dam.jpg", "facility": "笹流ダム"}
  ],
  "2001_5": [
    {"src": "photos/2001_5-1.jpg", "thumb": "photos/2001_5-1-thumb.jpg", "by": "Alpsdake", "title": "Mino Bridge from Mount Tanjo", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Mino_Bridge_from_Mount_Tanjo.jpg", "facility": ""}
  ],
  "2001_6": [
    {"src": "photos/2001_6-1.jpg", "thumb": "photos/2001_6-1-thumb.jpg", "by": "Qurren", "title": "Komaki Dam right view", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Komaki_Dam_right_view.jpg", "facility": ""},
    {"src": "photos/2001_6-2.jpg", "thumb": "photos/2001_6-2-thumb.jpg", "by": "Hirorinmasa", "title": "Komaki Dam", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Komaki_Dam.jpg", "facility": ""}
  ],
  "2001_7": [
    {"src": "photos/2001_7-1.jpg", "thumb": "photos/2001_7-1-thumb.jpg", "by": "ESU", "title": "旧蹴上発電所 , Keage Hydroelectric power plant - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%97%A7%E8%B9%B4%E4%B8%8A%E7%99%BA%E9%9B%BB%E6%89%80_,_Keage_Hydroelectric_power_plant_-_panoramio.jpg", "facility": "蹴上発電所"},
    {"src": "photos/2001_7-2.jpg", "thumb": "photos/2001_7-2-thumb.jpg", "by": "Qurren", "title": "Ebisugawa Power Station", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ebisugawa_Power_Station.jpg", "facility": "夷川発電所"},
    {"src": "photos/2001_7-3.jpg", "thumb": "photos/2001_7-3-thumb.jpg", "by": "Ukaji", "title": "Sumizome Power Station", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sumizome_Power_Station.jpg", "facility": "墨染発電所"},
    {"src": "photos/2001_7-4.jpg", "thumb": "photos/2001_7-4-thumb.jpg", "by": "Haruo.takagi", "title": "SakuroTanabe02", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:SakuroTanabe02.jpg", "facility": ""},
    {"src": "photos/2001_7-5.jpg", "thumb": "photos/2001_7-5-thumb.jpg", "by": "Haruo.takagi", "title": "SakuroTanabe03", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:SakuroTanabe03.jpg", "facility": ""}
  ],
  "2001_8": [
    {"src": "photos/2001_8-1.jpg", "thumb": "photos/2001_8-1-thumb.jpg", "by": "SUS303", "title": "20100206 1569D sogogawakyoryo", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:20100206_1569D_sogogawakyoryo.JPG", "facility": ""},
    {"src": "photos/2001_8-2.jpg", "thumb": "photos/2001_8-2-thumb.jpg", "by": "sk01", "title": "惣郷川橋梁 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%83%A3%E9%83%B7%E5%B7%9D%E6%A9%8B%E6%A2%81_-_panoramio.jpg", "facility": ""}
  ],
  "2001_10": [
    {"src": "misumi-quay.jpg", "thumb": "misumi-quay-thumb.jpg", "by": "そらみみ", "title": "Misumi Port Memorial Museum and wharf of Misumi West Port", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Misumi_Port_Memorial_Museum_and_wharf_of_Misumi_West_Port.jpg", "facility": ""}
  ],
  "2002_1": [
    {"src": "photos/2002_1-1.jpg", "thumb": "photos/2002_1-1-thumb.jpg", "by": "pakku", "title": "旭橋（Asahi Bridge） - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%97%AD%E6%A9%8B%EF%BC%88Asahi_Bridge%EF%BC%89_-_panoramio.jpg", "facility": ""}
  ],
  "2002_3": [
    {"src": "photos/2002_3-1.jpg", "thumb": "photos/2002_3-1-thumb.jpg", "by": "SQUAREZERO", "title": "Iwate-SL galaxy running on the Megane(eye glasses) Bridge-m", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Iwate-SL_galaxy_running_on_the_Megane(eye_glasses)_Bridge-m.jpg", "facility": "宮守川橋梁"},
    {"src": "photos/2002_3-2.jpg", "thumb": "photos/2002_3-2-thumb.jpg", "by": "Niiryoku2910", "title": "JR Kamaishi line Miyamori river bridge", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:JR_Kamaishi_line_Miyamori_river_bridge.jpg", "facility": "宮守川橋梁"}
  ],
  "2002_4": [
    {"src": "photos/2002_4-1.jpg", "thumb": "photos/2002_4-1-thumb.jpg", "by": "河川一等兵", "title": "Jyurokkyou-s-r1", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Jyurokkyou-s-r1.jpg", "facility": "十六橋水門"},
    {"src": "photos/2002_4-2.jpg", "thumb": "photos/2002_4-2-thumb.jpg", "by": "Sugikats", "title": "Marumori power plant Koriyama city", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Marumori_power_plant_Koriyama_city.jpg", "facility": "丸守発電所"}
  ],
  "2002_5": [
    {"src": "photos/2002_5-1.jpg", "thumb": "photos/2002_5-1-thumb.jpg", "by": "DAI-nk", "title": "Bandaibashi-Bridge 20130929", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Bandaibashi-Bridge_20130929.JPG", "facility": ""},
    {"src": "photos/2002_5-2.jpg", "thumb": "photos/2002_5-2-thumb.jpg", "by": "まつもと あんぱく(ampaku_mat…", "title": "萬代橋夜景 (Bandai-Bridge Night View) 2007年8月 - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E8%90%AC%E4%BB%A3%E6%A9%8B%E5%A4%9C%E6%99%AF_(Bandai-Bridge_Night_View)_2007%E5%B9%B48%E6%9C%88_-_panoramio.jpg", "facility": ""}
  ],
  "2002_7": [
    {"src": "photos/2002_7-1.jpg", "thumb": "photos/2002_7-1-thumb.jpg", "by": "elminium", "title": "Showa Bridge 昭和橋 坂城町 03 - Oct 9, 2017", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Showa_Bridge_%E6%98%AD%E5%92%8C%E6%A9%8B_%E5%9D%82%E5%9F%8E%E7%94%BA_03_-_Oct_9,_2017.jpg", "facility": "昭和橋"},
    {"src": "photos/2002_7-2.jpg", "thumb": "photos/2002_7-2-thumb.jpg", "by": "Thyristorchopper", "title": "Showa bridge (Chikuma river)", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Showa_bridge_(Chikuma_river).jpg", "facility": "昭和橋"},
    {"src": "photos/2002_7-3.jpg", "thumb": "photos/2002_7-3-thumb.jpg", "by": "Qurren", "title": "Sakae Bridge (Sakuho, Nagano) 2 (cropped)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sakae_Bridge_(Sakuho,_Nagano)_2_(cropped).jpg", "facility": "栄橋"}
  ],
  "2002_11": [
    {"src": "photos/2002_11-1.jpg", "thumb": "photos/2002_11-1-thumb.jpg", "by": "Carpkazu", "title": "Shinryu Bridge 01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Shinryu_Bridge_01.JPG", "facility": ""},
    {"src": "photos/2002_11-2.jpg", "thumb": "photos/2002_11-2-thumb.jpg", "by": "Carpkazu", "title": "Shinryu Bridge 02", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Shinryu_Bridge_02.JPG", "facility": ""}
  ],
  "2002_12": [
    {"src": "photos/2002_12-1.jpg", "thumb": "photos/2002_12-1-thumb.jpg", "by": "Reggaeman", "title": "Tamarubashi 01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tamarubashi_01.JPG", "facility": ""},
    {"src": "photos/2002_12-2.jpg", "thumb": "photos/2002_12-2-thumb.jpg", "by": "Reggaeman", "title": "Tamarubashi 02", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tamarubashi_02.JPG", "facility": ""}
  ],
  "2002_13": [
    {"src": "photos/2002_13-1.jpg", "thumb": "photos/2002_13-1-thumb.jpg", "by": "r18 INO (PACHIMO)", "title": "大橋ダム - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%A4%A7%E6%A9%8B%E3%83%80%E3%83%A0_-_panoramio.jpg", "facility": ""},
    {"src": "photos/2002_13-2.jpg", "thumb": "photos/2002_13-2-thumb.jpg", "by": "河川一等兵", "title": "Ohashi-2303-r1", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Ohashi-2303-r1.jpg", "facility": ""}
  ],
  "2002_14": [
    {"src": "photos/2002_14-1.jpg", "thumb": "photos/2002_14-1-thumb.jpg", "by": "sk01", "title": "明正井路第一石拱橋その1 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%98%8E%E6%AD%A3%E4%BA%95%E8%B7%AF%E7%AC%AC%E4%B8%80%E7%9F%B3%E6%8B%B1%E6%A9%8B%E3%81%9D%E3%81%AE1_-_panoramio.jpg", "facility": ""}
  ],
  "2002_15": [
    {"src": "photos/2002_15-1.jpg", "thumb": "photos/2002_15-1-thumb.jpg", "by": "sk01", "title": "美々津橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E7%BE%8E%E3%80%85%E6%B4%A5%E6%A9%8B_-_panoramio.jpg", "facility": ""}
  ],
  "2003_1": [
    {"src": "photos/2003_1-1.jpg", "thumb": "photos/2003_1-1-thumb.jpg", "by": "松岡明芳", "title": "Port of Wakkanai 北防波堤ドーム IMG 2649", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Port_of_Wakkanai_%E5%8C%97%E9%98%B2%E6%B3%A2%E5%A0%A4%E3%83%89%E3%83%BC%E3%83%A0_IMG_2649.jpg", "facility": ""}
  ],
  "2003_8": [
    {"src": "photos/2003_8-1.jpg", "thumb": "photos/2003_8-1-thumb.jpg", "by": "katorisi", "title": "Oigawa-bridge,Old National highway No.1,Shimada-city,Japan", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Oigawa-bridge,Old_National_highway_No.1,Shimada-city,Japan.jpg", "facility": ""}
  ],
  "2003_10": [
    {"src": "photos/2003_10-1.jpg", "thumb": "photos/2003_10-1-thumb.jpg", "by": "Alpsdake", "title": "Yanagase Suido", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Yanagase_Suido.jpg", "facility": ""},
    {"src": "photos/2003_10-2.jpg", "thumb": "photos/2003_10-2-thumb.jpg", "by": "Alpsdake", "title": "Yanagase Suido s2", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Yanagase_Suido_s2.jpg", "facility": ""}
  ],
  "2003_14": [
    {"src": "photos/2003_14-1.jpg", "thumb": "photos/2003_14-1-thumb.jpg", "by": "Taekotukide", "title": "Ogijima Lighthouse 1", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Ogijima_Lighthouse_1.jpg", "facility": ""}
  ],
  "2003_15": [
    {"src": "photos/2003_15-1.jpg", "thumb": "photos/2003_15-1-thumb.jpg", "by": "sk01", "title": "出島橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%87%BA%E5%B3%B6%E6%A9%8B_-_panoramio.jpg", "facility": ""},
    {"src": "photos/2003_15-2.jpg", "thumb": "photos/2003_15-2-thumb.jpg", "by": "Houjyou-Minori", "title": "Dejima bridge 02", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Dejima_bridge_02.jpg", "facility": ""}
  ],
  "2003_16": [
    {"src": "photos/2003_16-1.jpg", "thumb": "photos/2003_16-1-thumb.jpg", "by": "Pekachu", "title": "Saga plain reclamation dike", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Saga_plain_reclamation_dike.JPG", "facility": "授産社搦堤防"}
  ],
  "2004_3": [
    {"src": "photos/2004_3-1.jpg", "thumb": "photos/2004_3-1-thumb.jpg", "by": "畑山卓哉", "title": "Tokinami", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tokinami.jpg", "facility": "鴇波洗堰"},
    {"src": "photos/2004_3-2.jpg", "thumb": "photos/2004_3-2-thumb.jpg", "by": "ToshiJapon", "title": "WAKIYASUIMON", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:WAKIYASUIMON.JPG", "facility": "脇谷水門"}
  ],
  "2004_5": [
    {"src": "photos/2004_5-1.jpg", "thumb": "photos/2004_5-1-thumb.jpg", "by": "Katorisi", "title": "Totsuna-bridge,Iizaka-spa,Fukusima-city,Japan", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Totsuna-bridge,Iizaka-spa,Fukusima-city,Japan.JPG", "facility": ""}
  ],
  "2004_7": [
    {"src": "photos/2004_7-1.jpg", "thumb": "photos/2004_7-1-thumb.jpg", "by": "Y=F(X)", "title": "Yanagihara suikou 01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Yanagihara_suikou_01.jpg", "facility": ""}
  ],
  "2004_12": [
    {"src": "photos/2004_12-1.jpg", "thumb": "photos/2004_12-1-thumb.jpg", "by": "Motokoka", "title": "Dutch Dam at Shiga pref", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Dutch_Dam_at_Shiga_pref.jpg", "facility": ""}
  ],
  "2004_13": [
    {"src": "photos/2004_13-1.jpg", "thumb": "photos/2004_13-1-thumb.jpg", "by": "皓月旗", "title": "Wakasa Bridge 2022", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Wakasa_Bridge_2022.jpg", "facility": ""}
  ],
  "2004_16": [
    {"src": "photos/2004_16-1.jpg", "thumb": "photos/2004_16-1-thumb.jpg", "by": "そらみみ", "title": "View of Mount Tachibanayama and Najimabashi Bridge", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:View_of_Mount_Tachibanayama_and_Najimabashi_Bridge.JPG", "facility": ""},
    {"src": "photos/2004_16-2.jpg", "thumb": "photos/2004_16-2-thumb.jpg", "by": "そらみみ (Soramimi)", "title": "Najimabashi Bridge on Tataragawa River", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Najimabashi_Bridge_on_Tataragawa_River.JPG", "facility": ""}
  ],
  "2005_3": [
    {"src": "photos/2005_3-1.jpg", "thumb": "photos/2005_3-1-thumb.jpg", "by": "Highten31", "title": "CAPE CHIKYU", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:CAPE_CHIKYU.JPG", "facility": ""}
  ],
  "2005_5": [
    {"src": "photos/2005_5-1.jpg", "thumb": "photos/2005_5-1-thumb.jpg", "by": "Aimaimyi", "title": "Hakone Asahibashi -02", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Hakone_Asahibashi_-02.jpg", "facility": "旭橋"},
    {"src": "photos/2005_5-2.jpg", "thumb": "photos/2005_5-2-thumb.jpg", "by": "Aimaimyi", "title": "Hakone Chitosebashi -02", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Hakone_Chitosebashi_-02.jpg", "facility": "千歳橋"},
    {"src": "photos/2005_5-3.jpg", "thumb": "photos/2005_5-3-thumb.jpg", "by": "Aimaimyi", "title": "Kanreidomon -02", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kanreidomon_-02.jpg", "facility": "函嶺洞門"}
  ],
  "2005_6": [
    {"src": "photos/2005_6-1.jpg", "thumb": "photos/2005_6-1-thumb.jpg", "by": "Miyuki Meinaka", "title": "Tomatsuri Reservoir", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Tomatsuri_Reservoir.jpg", "facility": "戸祭配水場"},
    {"src": "photos/2005_6-2.jpg", "thumb": "photos/2005_6-2-thumb.jpg", "by": "Miyuki Meinaka", "title": "Utsunomiya City Imaichi System No.6 Junction Well", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Utsunomiya_City_Imaichi_System_No.6_Junction_Well.jpg", "facility": "第六号接合井"}
  ],
  "2005_11": [
    {"src": "photos/2005_11-1.jpg", "thumb": "photos/2005_11-1-thumb.jpg", "by": "Alpsdake", "title": "Abegawa Bridge (Shizuoka prefectural road route 208)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Abegawa_Bridge_(Shizuoka_prefectural_road_route_208).jpg", "facility": ""},
    {"src": "photos/2005_11-2.jpg", "thumb": "photos/2005_11-2-thumb.jpg", "by": "Alpsdake", "title": "Abekawa Bridge and Akebono Bridge", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Abekawa_Bridge_and_Akebono_Bridge.jpg", "facility": ""}
  ],
  "2005_13": [
    {"src": "photos/2005_13-1.jpg", "thumb": "photos/2005_13-1-thumb.jpg", "by": "663highland", "title": "Autumn in Mido-suji Osaka02n", "license": "CC BY 2.5", "licenseUrl": "https://creativecommons.org/licenses/by/2.5/", "source": "https://commons.wikimedia.org/wiki/File:Autumn_in_Mido-suji_Osaka02n.jpg", "facility": ""}
  ],
  "2005_14": [
    {"src": "photos/2005_14-1.jpg", "thumb": "photos/2005_14-1-thumb.jpg", "by": "明芳 松岡", "title": "2016-05-14 Shijimi-river siphon,bridge 志染川とサイフォン橋 DSCF3322☆彡", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:2016-05-14_Shijimi-river_siphon,bridge_%E5%BF%97%E6%9F%93%E5%B7%9D%E3%81%A8%E3%82%B5%E3%82%A4%E3%83%95%E3%82%A9%E3%83%B3%E6%A9%8B_DSCF3322%E2%98%86%E5%BD%A1.jpg", "facility": ""},
    {"src": "photos/2005_14-2.jpg", "thumb": "photos/2005_14-2-thumb.jpg", "by": "Indiana jo", "title": "Ougo sosui3", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Ougo_sosui3.JPG", "facility": ""}
  ],
  "2006_4": [
    {"src": "photos/2006_4-1.jpg", "thumb": "photos/2006_4-1-thumb.jpg", "by": "Ty19080914", "title": "Seigan bridge", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Seigan_bridge.jpg", "facility": ""}
  ],
  "2006_5": [
    {"src": "photos/2006_5-1.jpg", "thumb": "photos/2006_5-1-thumb.jpg", "by": "Ebiebi2", "title": "Old Meikyo Bridge 1", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Old_Meikyo_Bridge_1.jpg", "facility": ""}
  ],
  "2006_6": [
    {"src": "photos/2006_6-1.jpg", "thumb": "photos/2006_6-1-thumb.jpg", "by": "Totti", "title": "Shiriyasaki Todai 1", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Shiriyasaki_Todai_1.jpg", "facility": ""},
    {"src": "photos/2006_6-2.jpg", "thumb": "photos/2006_6-2-thumb.jpg", "by": "くろふね", "title": "尻屋埼灯台の寒立馬 02", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%B0%BB%E5%B1%8B%E5%9F%BC%E7%81%AF%E5%8F%B0%E3%81%AE%E5%AF%92%E7%AB%8B%E9%A6%AC_02.jpg", "facility": ""}
  ],
  "2006_8": [
    {"src": "photos/2006_8-1.jpg", "thumb": "photos/2006_8-1-thumb.jpg", "by": "Triglav", "title": "Nakayama-zuidou 02", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Nakayama-zuidou_02.jpg", "facility": ""},
    {"src": "photos/2006_8-2.jpg", "thumb": "photos/2006_8-2-thumb.jpg", "by": "Triglav", "title": "Nakayama-zuidou Nagaoka", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Nakayama-zuidou_Nagaoka.jpg", "facility": ""}
  ],
  "2006_9": [
    {"src": "photos/2006_9-1.jpg", "thumb": "photos/2006_9-1-thumb.jpg", "by": "妖精書士", "title": "Azuma zuido", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Azuma_zuido.JPG", "facility": "東隧道"},
    {"src": "photos/2006_9-2.jpg", "thumb": "photos/2006_9-2-thumb.jpg", "by": "妖精書士", "title": "Ōhara zuido", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:%C5%8Chara_zuido.JPG", "facility": "大原隧道"}
  ],
  "2006_12": [
    {"src": "photos/2006_12-1.jpg", "thumb": "photos/2006_12-1-thumb.jpg", "by": "京浜にけ", "title": "Nagareyama Tone Canal In Spring 1", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Nagareyama_Tone_Canal_In_Spring_1.JPG", "facility": ""},
    {"src": "photos/2006_12-2.jpg", "thumb": "photos/2006_12-2-thumb.jpg", "by": "くろふね", "title": "利根運河（流山市西深井）20260530-P1083968", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%88%A9%E6%A0%B9%E9%81%8B%E6%B2%B3%EF%BC%88%E6%B5%81%E5%B1%B1%E5%B8%82%E8%A5%BF%E6%B7%B1%E4%BA%95%EF%BC%8920260530-P1083968.jpg", "facility": ""}
  ],
  "2006_13": [
    {"src": "photos/2006_13-1.jpg", "thumb": "photos/2006_13-1-thumb.jpg", "by": "Asturio Cantabrio", "title": "Shirakawa Bridge 2021-12 ac (1)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Shirakawa_Bridge_2021-12_ac_(1).jpg", "facility": ""}
  ],
  "2006_17": [
    {"src": "photos/2006_17-1.jpg", "thumb": "photos/2006_17-1-thumb.jpg", "by": "Hirojin taja", "title": "2016 0426 Mukogawa River Route2", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:2016_0426_Mukogawa_River_Route2.jpg", "facility": ""}
  ],
  "2006_18": [
    {"src": "photos/2006_18-1.jpg", "thumb": "photos/2006_18-1-thumb.jpg", "by": "Bergmann", "title": "安治川トンネル内部", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%AE%89%E6%B2%BB%E5%B7%9D%E3%83%88%E3%83%B3%E3%83%8D%E3%83%AB%E5%86%85%E9%83%A8.JPG", "facility": ""}
  ],
  "2006_23": [
    {"src": "photos/2006_23-1.jpg", "thumb": "photos/2006_23-1-thumb.jpg", "by": "Tam0031", "title": "Kammon railway tunnel Shimonoseki portal", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kammon_railway_tunnel_Shimonoseki_portal.jpg", "facility": ""}
  ],
  "2006_24": [
    {"src": "photos/2006_24-1.jpg", "thumb": "photos/2006_24-1-thumb.jpg", "by": "Pekachu", "title": "Sendanbashi 1", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sendanbashi_1.JPG", "facility": ""},
    {"src": "photos/2006_24-2.jpg", "thumb": "photos/2006_24-2-thumb.jpg", "by": "Pekachu", "title": "Sendanbashi 2", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sendanbashi_2.JPG", "facility": ""}
  ],
  "2006_25": [
    {"src": "photos/2006_25-1.jpg", "thumb": "photos/2006_25-1-thumb.jpg", "by": "sk01", "title": "姫井橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%A7%AB%E4%BA%95%E6%A9%8B_-_panoramio.jpg", "facility": ""}
  ],
  "2007_2": [
    {"src": "photos/2007_2-1.jpg", "thumb": "photos/2007_2-1-thumb.jpg", "by": "禁樹なずな", "title": "Sapporo Waterworks Museum", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sapporo_Waterworks_Museum.JPG", "facility": ""}
  ],
  "2007_4": [
    {"src": "photos/2007_4-1.jpg", "thumb": "photos/2007_4-1-thumb.jpg", "by": "103momo", "title": "Tsuchizaki Port 1", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tsuchizaki_Port_1.jpg", "facility": "土崎港"},
    {"src": "photos/2007_4-2.jpg", "thumb": "photos/2007_4-2-thumb.jpg", "by": "掬茶", "title": "Mouth of the Omono River", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Mouth_of_the_Omono_River.jpg", "facility": "雄物川放水路"}
  ],
  "2007_5": [
    {"src": "photos/2007_5-1.jpg", "thumb": "photos/2007_5-1-thumb.jpg", "by": "Oriorigamigami4", "title": "Genroku Senketsu drainage tunnel", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Genroku_Senketsu_drainage_tunnel.jpg", "facility": "元禄潜穴"},
    {"src": "photos/2007_5-2.jpg", "thumb": "photos/2007_5-2-thumb.jpg", "by": "Oriorigamigami4", "title": "吉田川サイフォン出口", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%90%89%E7%94%B0%E5%B7%9D%E3%82%B5%E3%82%A4%E3%83%95%E3%82%A9%E3%83%B3%E5%87%BA%E5%8F%A3.jpg", "facility": "吉田川サイフォン"},
    {"src": "photos/2007_5-3.jpg", "thumb": "photos/2007_5-3-thumb.jpg", "by": "Oriorigamigami4", "title": "吉田川サイフォン入口", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%90%89%E7%94%B0%E5%B7%9D%E3%82%B5%E3%82%A4%E3%83%95%E3%82%A9%E3%83%B3%E5%85%A5%E5%8F%A3.jpg", "facility": "吉田川サイフォン"}
  ],
  "2007_14": [
    {"src": "photos/2007_14-1.jpg", "thumb": "photos/2007_14-1-thumb.jpg", "by": "Tomio344456", "title": "Meiji-Yosui Old Weir, Muro-machi Toyota 2013", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Meiji-Yosui_Old_Weir,_Muro-machi_Toyota_2013.jpg", "facility": ""},
    {"src": "photos/2007_14-2.jpg", "thumb": "photos/2007_14-2-thumb.jpg", "by": "Tomio344456", "title": "Distant View of Suigen Park from Meiji-Yosui Old Weir, Muro-machi Toyota 2013", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Distant_View_of_Suigen_Park_from_Meiji-Yosui_Old_Weir,_Muro-machi_Toyota_2013.jpg", "facility": ""}
  ],
  "2007_15": [
    {"src": "photos/2007_15-1.jpg", "thumb": "photos/2007_15-1-thumb.jpg", "by": "WDS487", "title": "Iwaibashi Nagoya 20130512 2", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Iwaibashi_Nagoya_20130512_2.JPG", "facility": ""}
  ],
  "2007_21": [
    {"src": "photos/2007_21-1.jpg", "thumb": "photos/2007_21-1-thumb.jpg", "by": "sk01", "title": "龍頭橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E9%BE%8D%E9%A0%AD%E6%A9%8B_-_panoramio.jpg", "facility": ""}
  ],
  "2008_04": [
    {"src": "photos/2008_04-1.jpg", "thumb": "photos/2008_04-1-thumb.jpg", "by": "Suz-b", "title": "Mogamigawa bridge Flower Nagai Line 01, Shirataka", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Mogamigawa_bridge_Flower_Nagai_Line_01,_Shirataka.jpg", "facility": "最上川橋梁（通称「荒砥鉄道橋」）"},
    {"src": "photos/2008_04-2.jpg", "thumb": "photos/2008_04-2-thumb.jpg", "by": "手練", "title": "Mogamigawa bridge of Yamagata Ry", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Mogamigawa_bridge_of_Yamagata_Ry.jpg", "facility": "最上川橋梁（通称「荒砥鉄道橋」）"}
  ],
  "2008_06": [
    {"src": "photos/2008_06-1.jpg", "thumb": "photos/2008_06-1-thumb.jpg", "by": "スランプ", "title": "勝沼堰堤全景", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%8B%9D%E6%B2%BC%E5%A0%B0%E5%A0%A4%E5%85%A8%E6%99%AF.jpg", "facility": ""},
    {"src": "photos/2008_06-2.jpg", "thumb": "photos/2008_06-2-thumb.jpg", "by": "スランプ", "title": "祇園の滝(勝沼堰堤)を下流から望む", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E7%A5%87%E5%9C%92%E3%81%AE%E6%BB%9D(%E5%8B%9D%E6%B2%BC%E5%A0%B0%E5%A0%A4)%E3%82%92%E4%B8%8B%E6%B5%81%E3%81%8B%E3%82%89%E6%9C%9B%E3%82%80.jpg", "facility": ""}
  ],
  "2008_07": [
    {"src": "photos/2008_07-1.jpg", "thumb": "photos/2008_07-1-thumb.jpg", "by": "Ippukucho", "title": "Ogurabashi", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ogurabashi.JPG", "facility": ""},
    {"src": "photos/2008_07-2.jpg", "thumb": "photos/2008_07-2-thumb.jpg", "by": "Aimaimyi", "title": "Ogurabashi -01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ogurabashi_-01.jpg", "facility": ""}
  ],
  "2008_12": [
    {"src": "photos/2008_12-1.jpg", "thumb": "photos/2008_12-1-thumb.jpg", "by": "Asturio Cantabrio", "title": "Dodo Lumber Yard ac (2)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Dodo_Lumber_Yard_ac_(2).jpg", "facility": ""},
    {"src": "photos/2008_12-2.jpg", "thumb": "photos/2008_12-2-thumb.jpg", "by": "Asturio Cantabrio", "title": "Dodo Lumber Yard ac (3)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Dodo_Lumber_Yard_ac_(3).jpg", "facility": ""}
  ],
  "2008_16": [
    {"src": "photos/2008_16-1.jpg", "thumb": "photos/2008_16-1-thumb.jpg", "by": "Nesnad", "title": "Shichijo-bigbridge-dec2014", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Shichijo-bigbridge-dec2014.jpg", "facility": ""},
    {"src": "photos/2008_16-2.jpg", "thumb": "photos/2008_16-2-thumb.jpg", "by": "Taito Koba", "title": "七条大橋 (100654623)", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E4%B8%83%E6%9D%A1%E5%A4%A7%E6%A9%8B_(100654623).jpeg", "facility": ""}
  ],
  "2008_21": [
    {"src": "photos/2008_21-1.jpg", "thumb": "photos/2008_21-1-thumb.jpg", "by": "Pekachu", "title": "Wakatsu Port Training Wall south part from Shinden-Ohashi 01", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Wakatsu_Port_Training_Wall_south_part_from_Shinden-Ohashi_01.jpg", "facility": ""},
    {"src": "photos/2008_21-2.jpg", "thumb": "photos/2008_21-2-thumb.jpg", "by": "Pekachu", "title": "Wakatsu Port Training Wall south part from Shinden-Ohashi 02", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Wakatsu_Port_Training_Wall_south_part_from_Shinden-Ohashi_02.jpg", "facility": ""}
  ],
  "2009_06": [
    {"src": "photos/2009_06-1.jpg", "thumb": "photos/2009_06-1-thumb.jpg", "by": "あばさー", "title": "Okutama Bridge 01", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Okutama_Bridge_01.JPG", "facility": ""},
    {"src": "photos/2009_06-2.jpg", "thumb": "photos/2009_06-2-thumb.jpg", "by": "osekkai", "title": "Okutama-bashi", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Okutama-bashi.jpg", "facility": ""}
  ],
  "2009_08": [
    {"src": "photos/2009_08-1.jpg", "thumb": "photos/2009_08-1-thumb.jpg", "by": "Tx-re", "title": "Kotsubo Tunnel Tx-re", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kotsubo_Tunnel_Tx-re.jpg", "facility": ""}
  ],
  "2009_14": [
    {"src": "photos/2009_14-1.jpg", "thumb": "photos/2009_14-1-thumb.jpg", "by": "掬茶", "title": "Atohiki Aqua Viaduct 20180505a", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Atohiki_Aqua_Viaduct_20180505a.jpg", "facility": ""}
  ],
  "2009_15": [
    {"src": "photos/2009_15-1.jpg", "thumb": "photos/2009_15-1-thumb.jpg", "by": "Harimawood", "title": "平木橋２", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%B9%B3%E6%9C%A8%E6%A9%8B%EF%BC%92.jpg", "facility": ""},
    {"src": "photos/2009_15-2.jpg", "thumb": "photos/2009_15-2-thumb.jpg", "by": "Harimawood", "title": "平木橋１", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%B9%B3%E6%9C%A8%E6%A9%8B%EF%BC%91.jpg", "facility": ""}
  ],
  "2009_17": [
    {"src": "photos/2009_17-1.jpg", "thumb": "photos/2009_17-1-thumb.jpg", "by": "ignis", "title": "Honmachibashi Osaka JPN 003", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Honmachibashi_Osaka_JPN_003.jpg", "facility": ""}
  ],
  "2009_18": [
    {"src": "photos/2009_18-1.jpg", "thumb": "photos/2009_18-1-thumb.jpg", "by": "minato kaidou", "title": "Tsunoshima Lighthouse 角島灯台 Nov 11, 2015", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Tsunoshima_Lighthouse_%E8%A7%92%E5%B3%B6%E7%81%AF%E5%8F%B0_Nov_11,_2015.jpg", "facility": ""}
  ],
  "2009_25": [
    {"src": "photos/2009_25-1.jpg", "thumb": "photos/2009_25-1-thumb.jpg", "by": "Tze Chiang Hao", "title": "烏山頭水庫01", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E7%83%8F%E5%B1%B1%E9%A0%AD%E6%B0%B4%E5%BA%AB01.jpg", "facility": ""},
    {"src": "photos/2009_25-2.jpg", "thumb": "photos/2009_25-2-thumb.jpg", "by": "Mrmarkertw", "title": "2025年烏山頭水庫舊放水口03", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:2025%E5%B9%B4%E7%83%8F%E5%B1%B1%E9%A0%AD%E6%B0%B4%E5%BA%AB%E8%88%8A%E6%94%BE%E6%B0%B4%E5%8F%A303.jpg", "facility": ""}
  ],
  "2010_01": [
    {"src": "photos/2010_01-1.jpg", "thumb": "photos/2010_01-1-thumb.jpg", "by": "禁樹なずな", "title": "Hokkaido Zero Milestone", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Hokkaido_Zero_Milestone.JPG", "facility": ""}
  ],
  "2010_08": [
    {"src": "photos/2010_08-1.jpg", "thumb": "photos/2010_08-1-thumb.jpg", "by": "Miyuki Meinaka", "title": "Kinu Bridge", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kinu_Bridge.jpg", "facility": ""},
    {"src": "photos/2010_08-2.jpg", "thumb": "photos/2010_08-2-thumb.jpg", "by": "Miyuki Meinaka", "title": "Kinu Bridge 2", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kinu_Bridge_2.jpg", "facility": ""}
  ],
  "2010_14": [
    {"src": "photos/2010_14-1.jpg", "thumb": "photos/2010_14-1-thumb.jpg", "by": "Loadambala 2001", "title": "Horiwarigawa-Landing Place", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Horiwarigawa-Landing_Place.jpg", "facility": ""}
  ],
  "2010_16": [
    {"src": "photos/2010_16-1.jpg", "thumb": "photos/2010_16-1-thumb.jpg", "by": "Alpsdake", "title": "Matsushige Lock Gate s3", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Matsushige_Lock_Gate_s3.jpg", "facility": ""},
    {"src": "photos/2010_16-2.jpg", "thumb": "photos/2010_16-2-thumb.jpg", "by": "WDS487", "title": "Matsushige Komon 20121119 02", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Matsushige_Komon_20121119_02.JPG", "facility": ""}
  ],
  "2010_17": [
    {"src": "photos/2010_17-1.jpg", "thumb": "photos/2010_17-1-thumb.jpg", "by": "Alpsdake", "title": "Shimizu Lighthouse (Miho no Matsubara)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Shimizu_Lighthouse_(Miho_no_Matsubara).JPG", "facility": ""}
  ],
  "2010_18": [
    {"src": "photos/2010_18-1.jpg", "thumb": "photos/2010_18-1-thumb.jpg", "by": "ignis", "title": "Misulocks Kyoto JPN", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Misulocks_Kyoto_JPN.jpg", "facility": ""},
    {"src": "photos/2010_18-2.jpg", "thumb": "photos/2010_18-2-thumb.jpg", "by": "kajikawa", "title": "三栖閘門 - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E4%B8%89%E6%A0%96%E9%96%98%E9%96%80_-_panoramio.jpg", "facility": ""}
  ],
  "2010_21": [
    {"src": "photos/2010_21-1.jpg", "thumb": "photos/2010_21-1-thumb.jpg", "by": "MaedaAkihiko", "title": "Okayama Tai-Bridge Outside", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:Okayama_Tai-Bridge_Outside.jpg", "facility": "田井橋"},
    {"src": "photos/2010_21-2.jpg", "thumb": "photos/2010_21-2-thumb.jpg", "by": "MaedaAkihiko", "title": "Okayama Tai-Bridge Inside", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:Okayama_Tai-Bridge_Inside.jpg", "facility": "田井橋"},
    {"src": "photos/2010_21-3.jpg", "thumb": "photos/2010_21-3-thumb.jpg", "by": "Hrykt", "title": "Houkoku Bridge, Takahashi River and Gagyuusan Mountain", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Houkoku_Bridge,_Takahashi_River_and_Gagyuusan_Mountain.jpg", "facility": "方谷橋"}
  ],
  "2010_23": [
    {"src": "photos/2010_23-1.jpg", "thumb": "photos/2010_23-1-thumb.jpg", "by": "Yoichiro Shigeyama", "title": "Meiji Bridge in Yawatahama (1) - May 9, 2010", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Meiji_Bridge_in_Yawatahama_(1)_-_May_9,_2010.jpg", "facility": ""},
    {"src": "photos/2010_23-2.jpg", "thumb": "photos/2010_23-2-thumb.jpg", "by": "Yoichiro Shigeyama", "title": "Meiji Bridge in Yawatahama (3) - May 9, 2010", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Meiji_Bridge_in_Yawatahama_(3)_-_May_9,_2010.jpg", "facility": ""}
  ],
  "2010_24": [
    {"src": "photos/2010_24-1.jpg", "thumb": "photos/2010_24-1-thumb.jpg", "by": "Pekachu", "title": "Hamaguri-suido aqueduct 2017 02", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Hamaguri-suido_aqueduct_2017_02.jpg", "facility": ""}
  ],
  "2010_26": [
    {"src": "photos/2010_26-1.jpg", "thumb": "photos/2010_26-1-thumb.jpg", "by": "Sanjo", "title": "Gokase River Hinokage Gomi", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Gokase_River_Hinokage_Gomi.JPG", "facility": ""},
    {"src": "photos/2010_26-2.jpg", "thumb": "photos/2010_26-2-thumb.jpg", "by": "Compass135", "title": "第三五ヶ瀬川橋梁", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E7%AC%AC%E4%B8%89%E4%BA%94%E3%83%B6%E7%80%AC%E5%B7%9D%E6%A9%8B%E6%A2%81.jpg", "facility": ""}
  ],
  "2011_06": [
    {"src": "photos/2011_06-1.jpg", "thumb": "photos/2011_06-1-thumb.jpg", "by": "Muu003", "title": "筑波山千寺川砂防堰堤群", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E7%AD%91%E6%B3%A2%E5%B1%B1%E5%8D%83%E5%AF%BA%E5%B7%9D%E7%A0%82%E9%98%B2%E5%A0%B0%E5%A0%A4%E7%BE%A4.jpeg", "facility": ""}
  ],
  "2011_12": [
    {"src": "photos/2011_12-1.jpg", "thumb": "photos/2011_12-1-thumb.jpg", "by": "KKPCW", "title": "Higashiyama Water Tower - 4", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Higashiyama_Water_Tower_-_4.jpg", "facility": "東山給水塔"},
    {"src": "photos/2011_12-2.jpg", "thumb": "photos/2011_12-2-thumb.jpg", "by": "Tomio344456", "title": "Views of Nittai-ji Cemetery and Higashiyama Water Tower, Shiroyama-shin-machi Chikusa Ward Nagoya 2021", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Views_of_Nittai-ji_Cemetery_and_Higashiyama_Water_Tower,_Shiroyama-shin-machi_Chikusa_Ward_Nagoya_2021.jpg", "facility": "東山給水塔"},
    {"src": "photos/2011_12-3.jpg", "thumb": "photos/2011_12-3-thumb.jpg", "by": "Akaneiroiro", "title": "Higashiyamahaisuitou0522", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Higashiyamahaisuitou0522.jpg", "facility": ""}
  ],
  "2011_13": [
    {"src": "photos/2011_13-1.jpg", "thumb": "photos/2011_13-1-thumb.jpg", "by": "onaonan", "title": "Ohotabashi-4", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ohotabashi-4.JPG", "facility": ""},
    {"src": "photos/2011_13-2.jpg", "thumb": "photos/2011_13-2-thumb.jpg", "by": "onaonan", "title": "Ohotabashi-2", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ohotabashi-2.JPG", "facility": ""}
  ],
  "2011_15": [
    {"src": "photos/2011_15-1.jpg", "thumb": "photos/2011_15-1-thumb.jpg", "by": "Kosuke64", "title": "湊川隧道", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%B9%8A%E5%B7%9D%E9%9A%A7%E9%81%93.jpg", "facility": ""}
  ],
  "2011_16": [
    {"src": "photos/2011_16-1.jpg", "thumb": "photos/2011_16-1-thumb.jpg", "by": "Haruhiko Okumura", "title": "Nara Station Building (1934) 20141012", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Nara_Station_Building_(1934)_20141012.jpg", "facility": ""}
  ],
  "2011_18": [
    {"src": "photos/2011_18-1.jpg", "thumb": "photos/2011_18-1-thumb.jpg", "by": "HKT3012", "title": "Enko Bridge", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Enko_Bridge.jpg", "facility": "猿猴橋"},
    {"src": "photos/2011_18-2.jpg", "thumb": "photos/2011_18-2-thumb.jpg", "by": "Taisyo", "title": "猿猴橋01", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E7%8C%BF%E7%8C%B4%E6%A9%8B01.JPG", "facility": "猿猴橋"}
  ],
  "2012_03": [
    {"src": "photos/2012_03-1.jpg", "thumb": "photos/2012_03-1-thumb.jpg", "by": "Yoit", "title": "駒沢給水塔", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E9%A7%92%E6%B2%A2%E7%B5%A6%E6%B0%B4%E5%A1%94.jpg", "facility": ""},
    {"src": "photos/2012_03-2.jpg", "thumb": "photos/2012_03-2-thumb.jpg", "by": "Sicemaster", "title": "駒沢給水所／装飾", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E9%A7%92%E6%B2%A2%E7%B5%A6%E6%B0%B4%E6%89%80%EF%BC%8F%E8%A3%85%E9%A3%BE.jpg", "facility": ""}
  ],
  "2012_05": [
    {"src": "photos/2012_05-1.jpg", "thumb": "photos/2012_05-1-thumb.jpg", "by": "珈琲牛乳", "title": "二ヶ領用水 - panoramio (5)", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E4%BA%8C%E3%83%B6%E9%A0%98%E7%94%A8%E6%B0%B4_-_panoramio_(5).jpg", "facility": ""},
    {"src": "photos/2012_05-2.jpg", "thumb": "photos/2012_05-2-thumb.jpg", "by": "珈琲牛乳", "title": "二ヶ領用水 - panoramio (1)", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E4%BA%8C%E3%83%B6%E9%A0%98%E7%94%A8%E6%B0%B4_-_panoramio_(1).jpg", "facility": ""}
  ],
  "2012_09": [
    {"src": "photos/2012_09-1.jpg", "thumb": "photos/2012_09-1-thumb.jpg", "by": "Sakaori", "title": "Nagatoro Bridge in Shosenkyo entrance of Tenjinmori", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Nagatoro_Bridge_in_Shosenkyo_entrance_of_Tenjinmori.JPG", "facility": ""}
  ],
  "2012_14": [
    {"src": "photos/2012_14-1.jpg", "thumb": "photos/2012_14-1-thumb.jpg", "by": "Alpsdake", "title": "Nagara ohashi", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Nagara_ohashi.JPG", "facility": ""},
    {"src": "photos/2012_14-2.jpg", "thumb": "photos/2012_14-2-thumb.jpg", "by": "Alpsdake", "title": "Nagara Bridge (Gifu Prefectural Road Route 31)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Nagara_Bridge_(Gifu_Prefectural_Road_Route_31).jpg", "facility": ""}
  ],
  "2012_16": [
    {"src": "photos/2012_16-1.jpg", "thumb": "photos/2012_16-1-thumb.jpg", "by": "はやたま", "title": "HamaNakatsuBridge-01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:HamaNakatsuBridge-01.jpg", "facility": ""}
  ],
  "2012_17": [
    {"src": "photos/2012_17-1.jpg", "thumb": "photos/2012_17-1-thumb.jpg", "by": "Ofuku33", "title": "堀川第一橋01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%A0%80%E5%B7%9D%E7%AC%AC%E4%B8%80%E6%A9%8B01.jpg", "facility": ""},
    {"src": "photos/2012_17-2.jpg", "thumb": "photos/2012_17-2-thumb.jpg", "by": "Culturegeek", "title": "Horikawa daiichi bridge south", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Horikawa_daiichi_bridge_south.JPG", "facility": ""}
  ],
  "2012_24": [
    {"src": "photos/2012_24-1.jpg", "thumb": "photos/2012_24-1-thumb.jpg", "by": "そらみみ", "title": "View of Yamada Weir on Chikugogawa River", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:View_of_Yamada_Weir_on_Chikugogawa_River.jpg", "facility": ""},
    {"src": "photos/2012_24-2.jpg", "thumb": "photos/2012_24-2-thumb.jpg", "by": "そらみみ", "title": "Horikawa Aqueducts near Yamada Weir", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Horikawa_Aqueducts_near_Yamada_Weir.jpg", "facility": ""}
  ],
  "2013_04": [
    {"src": "photos/2013_04-1.jpg", "thumb": "photos/2013_04-1-thumb.jpg", "by": "京浜にけ (Keihin Nike)", "title": "Katsushika Tokyo Koumon Bridge 1 201304", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Katsushika_Tokyo_Koumon_Bridge_1_201304.jpg", "facility": ""}
  ],
  "2013_05": [
    {"src": "photos/2013_05-1.jpg", "thumb": "photos/2013_05-1-thumb.jpg", "by": "nubobo", "title": "Chosei Bridge 20130802", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Chosei_Bridge_20130802.jpg", "facility": ""},
    {"src": "photos/2013_05-2.jpg", "thumb": "photos/2013_05-2-thumb.jpg", "by": "Nihongo1234", "title": "Chosei bridge light up", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Chosei_bridge_light_up.jpg", "facility": ""}
  ],
  "2013_10": [
    {"src": "photos/2013_10-1.jpg", "thumb": "photos/2013_10-1-thumb.jpg", "by": "Thyristorchopper", "title": "Kajima bashi (bridge) across over Tenryu River", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kajima_bashi_(bridge)_across_over_Tenryu_River.JPG", "facility": ""},
    {"src": "photos/2013_10-2.jpg", "thumb": "photos/2013_10-2-thumb.jpg", "by": "Halowand", "title": "Kajima bashi across Tenryu River seen from Tenryū Hamanako Line", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kajima_bashi_across_Tenryu_River_seen_from_Tenry%C5%AB_Hamanako_Line.jpg", "facility": ""}
  ],
  "2013_13": [
    {"src": "photos/2013_13-1.jpg", "thumb": "photos/2013_13-1-thumb.jpg", "by": "Hatanomoto", "title": "Old Shinsaibashi at Tsurumi Ryokuchi", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Old_Shinsaibashi_at_Tsurumi_Ryokuchi.jpg", "facility": ""}
  ],
  "2013_14": [
    {"src": "photos/2013_14-1.jpg", "thumb": "photos/2013_14-1-thumb.jpg", "by": "河川一等兵", "title": "Okawara Power station", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Okawara_Power_station.JPG", "facility": "大河原発電所"},
    {"src": "photos/2013_14-2.jpg", "thumb": "photos/2013_14-2-thumb.jpg", "by": "Gohachiyasu1214", "title": "Okawara Power station-01", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Okawara_Power_station-01.jpg", "facility": "大河原発電所"}
  ],
  "2013_20": [
    {"src": "photos/2013_20-1.jpg", "thumb": "photos/2013_20-1-thumb.jpg", "by": "sk01", "title": "洗玉眼鏡橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%B4%97%E7%8E%89%E7%9C%BC%E9%8F%A1%E6%A9%8B_-_panoramio.jpg", "facility": ""}
  ],
  "2013_21": [
    {"src": "photos/2013_21-1.jpg", "thumb": "photos/2013_21-1-thumb.jpg", "by": "Asturio Cantabrio", "title": "Gosen Aqueduct Well ac (1)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Gosen_Aqueduct_Well_ac_(1).jpg", "facility": ""},
    {"src": "photos/2013_21-2.jpg", "thumb": "photos/2013_21-2-thumb.jpg", "by": "Asturio Cantabrio", "title": "Gosen Aqueduct Well ac (2)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Gosen_Aqueduct_Well_ac_(2).jpg", "facility": ""}
  ],
  "2014_03": [
    {"src": "photos/2014_03-1.jpg", "thumb": "photos/2014_03-1-thumb.jpg", "by": "Nr83aqiog", "title": "Kumagane-bridge 2016", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kumagane-bridge_2016.jpg", "facility": "第二広瀬川橋梁"},
    {"src": "photos/2014_03-2.jpg", "thumb": "photos/2014_03-2-thumb.jpg", "by": "Awo1265", "title": "Kumagane-bridge2 2016", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kumagane-bridge2_2016.jpg", "facility": "第二広瀬川橋梁"}
  ],
  "2014_04": [
    {"src": "photos/2014_04-1.jpg", "thumb": "photos/2014_04-1-thumb.jpg", "by": "くろふね", "title": "成宗電車第一トンネル20220709-P1001027", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%88%90%E5%AE%97%E9%9B%BB%E8%BB%8A%E7%AC%AC%E4%B8%80%E3%83%88%E3%83%B3%E3%83%8D%E3%83%AB20220709-P1001027.jpg", "facility": "成宗電車第一トンネル"},
    {"src": "photos/2014_04-2.jpg", "thumb": "photos/2014_04-2-thumb.jpg", "by": "Suikotei", "title": "Seiso Electric Railroad No.2 Tunnel-1", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Seiso_Electric_Railroad_No.2_Tunnel-1.jpg", "facility": "成宗電車第二トンネル"},
    {"src": "photos/2014_04-3.jpg", "thumb": "photos/2014_04-3-thumb.jpg", "by": "Suikotei", "title": "Seiso Electric Railroad No.2 Tunnel-2", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Seiso_Electric_Railroad_No.2_Tunnel-2.jpg", "facility": "成宗電車第二トンネル"}
  ],
  "2014_05": [
    {"src": "photos/2014_05-1.jpg", "thumb": "photos/2014_05-1-thumb.jpg", "by": "Shoestring", "title": "Hamura Diversion Weir, Hamura, Tokyo, Japan", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Hamura_Diversion_Weir,_Hamura,_Tokyo,_Japan.JPG", "facility": ""}
  ],
  "2014_10": [
    {"src": "photos/2014_10-1.jpg", "thumb": "photos/2014_10-1-thumb.jpg", "by": "Jun Nishiseko", "title": "Shikishima Water Tower", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Shikishima_Water_Tower.jpg", "facility": ""}
  ],
  "2014_18": [
    {"src": "photos/2014_18-1.jpg", "thumb": "photos/2014_18-1-thumb.jpg", "by": "TR15336300101", "title": "Kotone Tunnel", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kotone_Tunnel.jpg", "facility": ""},
    {"src": "photos/2014_18-2.jpg", "thumb": "photos/2014_18-2-thumb.jpg", "by": "TR15336300101", "title": "Keystone of Kotone tunnel", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Keystone_of_Kotone_tunnel.jpg", "facility": ""}
  ],
  "2014_20": [
    {"src": "photos/2014_20-1.jpg", "thumb": "photos/2014_20-1-thumb.jpg", "by": "利用者名42", "title": "Kumai Zuido entrance", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kumai_Zuido_entrance.jpg", "facility": ""}
  ],
  "2014_22": [
    {"src": "photos/2014_22-1.jpg", "thumb": "photos/2014_22-1-thumb.jpg", "by": "ハポニアラ", "title": "Yunoda Bridge 5", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Yunoda_Bridge_5.jpg", "facility": ""}
  ],
  "2015_07": [
    {"src": "photos/2015_07-1.jpg", "thumb": "photos/2015_07-1-thumb.jpg", "by": "Ka23 13", "title": "Tsukuba 20260707 144415", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Tsukuba_20260707_144415.jpg", "facility": ""},
    {"src": "photos/2015_07-2.jpg", "thumb": "photos/2015_07-2-thumb.jpg", "by": "Marufish", "title": "Miyawaki Station, Tsukubasan Cablecar - Nov 19, 2009", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Miyawaki_Station,_Tsukubasan_Cablecar_-_Nov_19,_2009.jpg", "facility": ""}
  ],
  "2015_09": [
    {"src": "photos/2015_09-1.jpg", "thumb": "photos/2015_09-1-thumb.jpg", "by": "Tak1701d", "title": "Benchmark at Enpuku-ji, Choshi", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Benchmark_at_Enpuku-ji,_Choshi.jpg", "facility": ""}
  ],
  "2015_11": [
    {"src": "photos/2015_11-1.jpg", "thumb": "photos/2015_11-1-thumb.jpg", "by": "WDS487", "title": "Shonaiyosui Motoirihimon 20121211", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Shonaiyosui_Motoirihimon_20121211.JPG", "facility": ""},
    {"src": "photos/2015_11-2.jpg", "thumb": "photos/2015_11-2-thumb.jpg", "by": "Asturio Cantabrio", "title": "Shonai Irrigation Motoiri Floodgate ac (2)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Shonai_Irrigation_Motoiri_Floodgate_ac_(2).jpg", "facility": ""}
  ],
  "2015_15": [
    {"src": "photos/2015_15-1.jpg", "thumb": "photos/2015_15-1-thumb.jpg", "by": "melvil", "title": "No07-bessyosunadome02", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:No07-bessyosunadome02.jpg", "facility": ""},
    {"src": "photos/2015_15-2.jpg", "thumb": "photos/2015_15-2-thumb.jpg", "by": "melvil", "title": "No11-12-bessyosunadome02", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:No11-12-bessyosunadome02.jpg", "facility": ""}
  ],
  "2015_17": [
    {"src": "photos/2015_17-1.jpg", "thumb": "photos/2015_17-1-thumb.jpg", "by": "河川一等兵", "title": "Minari-1730-r1", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Minari-1730-r1.JPG", "facility": ""}
  ],
  "2015_19": [
    {"src": "photos/2015_19-1.jpg", "thumb": "photos/2015_19-1-thumb.jpg", "by": "Tam0031", "title": "Daiichi Shirakawa bridge with Yusuge train", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Daiichi_Shirakawa_bridge_with_Yusuge_train.jpg", "facility": ""},
    {"src": "photos/2015_19-2.jpg", "thumb": "photos/2015_19-2-thumb.jpg", "by": "手練", "title": "Daiichi Shirakawa bridge during test flooding of Tateno dam", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Daiichi_Shirakawa_bridge_during_test_flooding_of_Tateno_dam.jpg", "facility": ""}
  ],
  "2016_06": [
    {"src": "photos/2016_06-1.jpg", "thumb": "photos/2016_06-1-thumb.jpg", "by": "Qurren", "title": "Naruko Dam survey (cropped)", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Naruko_Dam_survey_(cropped).jpg", "facility": ""},
    {"src": "photos/2016_06-2.jpg", "thumb": "photos/2016_06-2-thumb.jpg", "by": "Qurren", "title": "Naruko Dam valve discharge", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Naruko_Dam_valve_discharge.jpg", "facility": ""}
  ],
  "2016_08": [
    {"src": "photos/2016_08-1.jpg", "thumb": "photos/2016_08-1-thumb.jpg", "by": "Wiiii", "title": "Hibiki Bridge 2009", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Hibiki_Bridge_2009.jpg", "facility": ""}
  ],
  "2016_10": [
    {"src": "photos/2016_10-1.jpg", "thumb": "photos/2016_10-1-thumb.jpg", "by": "KENPEI", "title": "Minami takabashi1", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Minami_takabashi1.jpg", "facility": ""}
  ],
  "2016_12": [
    {"src": "photos/2016_12-1.jpg", "thumb": "photos/2016_12-1-thumb.jpg", "by": "Fumihiro Kato", "title": "Koyama Himon FK 07", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Koyama_Himon_FK_07.jpg", "facility": ""},
    {"src": "photos/2016_12-2.jpg", "thumb": "photos/2016_12-2-thumb.jpg", "by": "Ka23 13", "title": "Matsudo 20210323 164006", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Matsudo_20210323_164006.jpg", "facility": ""}
  ],
  "2016_13": [
    {"src": "photos/2016_13-1.jpg", "thumb": "photos/2016_13-1-thumb.jpg", "by": "Quercus acuta", "title": "Shounankou Lighthouse 01", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Shounankou_Lighthouse_01.jpg", "facility": ""},
    {"src": "photos/2016_13-2.jpg", "thumb": "photos/2016_13-2-thumb.jpg", "by": "Miyuki Meinaka", "title": "Port of Shonan", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Port_of_Shonan.jpg", "facility": ""}
  ],
  "2016_15": [
    {"src": "photos/2016_15-1.jpg", "thumb": "photos/2016_15-1-thumb.jpg", "by": "KAMUI", "title": "Koya-bridge01", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Koya-bridge01.jpg", "facility": ""},
    {"src": "photos/2016_15-2.jpg", "thumb": "photos/2016_15-2-thumb.jpg", "by": "KKPCW", "title": "SLあおなみ号運行時の向野橋 - 1", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:SL%E3%81%82%E3%81%8A%E3%81%AA%E3%81%BF%E5%8F%B7%E9%81%8B%E8%A1%8C%E6%99%82%E3%81%AE%E5%90%91%E9%87%8E%E6%A9%8B_-_1.jpg", "facility": ""}
  ],
  "2016_16": [
    {"src": "photos/2016_16-1.jpg", "thumb": "photos/2016_16-1-thumb.jpg", "by": "Tomio344456", "title": "View of Nagoya Port Drawbridge, Irifune Minato Ward Nagoya 2022", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:View_of_Nagoya_Port_Drawbridge,_Irifune_Minato_Ward_Nagoya_2022.jpg", "facility": ""},
    {"src": "photos/2016_16-2.jpg", "thumb": "photos/2016_16-2-thumb.jpg", "by": "full moon69", "title": "名古屋港跳上橋 - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%90%8D%E5%8F%A4%E5%B1%8B%E6%B8%AF%E8%B7%B3%E4%B8%8A%E6%A9%8B_-_panoramio.jpg", "facility": ""}
  ],
  "2016_21": [
    {"src": "photos/2016_21-1.jpg", "thumb": "photos/2016_21-1-thumb.jpg", "by": "Ka23 13", "title": "Shimonoseki 20240428 132629", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Shimonoseki_20240428_132629.jpg", "facility": ""}
  ],
  "2016_24": [
    {"src": "photos/2016_24-1.jpg", "thumb": "photos/2016_24-1-thumb.jpg", "by": "hyolee2", "title": "Aira Bridge", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Aira_Bridge.JPG", "facility": ""}
  ],
  "2017_01": [
    {"src": "photos/2017_01-1.jpg", "thumb": "photos/2017_01-1-thumb.jpg", "by": "我路・幌内画像倉庫", "title": "Takinoue power station 北炭滝之上水力発電所建屋", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Takinoue_power_station_%E5%8C%97%E7%82%AD%E6%BB%9D%E4%B9%8B%E4%B8%8A%E6%B0%B4%E5%8A%9B%E7%99%BA%E9%9B%BB%E6%89%80%E5%BB%BA%E5%B1%8B.jpg", "facility": ""}
  ],
  "2017_03": [
    {"src": "photos/2017_03-1.jpg", "thumb": "photos/2017_03-1-thumb.jpg", "by": "m-jy", "title": "聖橋と御茶ノ水駅(Hijiri bridge and Ochanomizu station) - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E8%81%96%E6%A9%8B%E3%81%A8%E5%BE%A1%E8%8C%B6%E3%83%8E%E6%B0%B4%E9%A7%85(Hijiri_bridge_and_Ochanomizu_station)_-_panoramio.jpg", "facility": ""}
  ],
  "2017_14": [
    {"src": "photos/2017_14-1.jpg", "thumb": "photos/2017_14-1-thumb.jpg", "by": "ほっきー", "title": "樫野崎灯台(2021)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%A8%AB%E9%87%8E%E5%B4%8E%E7%81%AF%E5%8F%B0(2021).jpg", "facility": ""}
  ],
  "2018_01": [
    {"src": "photos/2018_01-1.jpg", "thumb": "photos/2018_01-1-thumb.jpg", "by": "663highland", "title": "Chitose River Lake Shikotsu03n3200", "license": "CC BY 2.5", "licenseUrl": "https://creativecommons.org/licenses/by/2.5/", "source": "https://commons.wikimedia.org/wiki/File:Chitose_River_Lake_Shikotsu03n3200.jpg", "facility": ""},
    {"src": "photos/2018_01-2.jpg", "thumb": "photos/2018_01-2-thumb.jpg", "by": "Takisaw", "title": "Yamasen Railway Bridge", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Yamasen_Railway_Bridge.jpg", "facility": ""}
  ],
  "2018_03": [
    {"src": "photos/2018_03-1.jpg", "thumb": "photos/2018_03-1-thumb.jpg", "by": "Kestrel", "title": "Aburatsubo Tide Station PB193846", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Aburatsubo_Tide_Station_PB193846.jpg", "facility": ""}
  ],
  "2018_09": [
    {"src": "photos/2018_09-1.jpg", "thumb": "photos/2018_09-1-thumb.jpg", "by": "Yamaguchi Yoshiaki from Japan", "title": "Okutama lake(Ogouchi dam) (3046400768)", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Okutama_lake(Ogouchi_dam)_(3046400768).jpg", "facility": ""},
    {"src": "photos/2018_09-2.jpg", "thumb": "photos/2018_09-2-thumb.jpg", "by": "Yamaguchi Yoshiaki from Japan", "title": "Okutama lake(Ogouchi dam) (3048619860)", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Okutama_lake(Ogouchi_dam)_(3048619860).jpg", "facility": ""}
  ],
  "2018_10": [
    {"src": "photos/2018_10-1.jpg", "thumb": "photos/2018_10-1-thumb.jpg", "by": "京浜にけ", "title": "Saitama Senganhi In Senganhi-Suigo Park 1", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Saitama_Senganhi_In_Senganhi-Suigo_Park_1.JPG", "facility": ""}
  ],
  "2018_13": [
    {"src": "photos/2018_13-1.jpg", "thumb": "photos/2018_13-1-thumb.jpg", "by": "Pekke", "title": "Kano rever and Onari bridge", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kano_rever_and_Onari_bridge.jpg", "facility": ""},
    {"src": "photos/2018_13-2.jpg", "thumb": "photos/2018_13-2-thumb.jpg", "by": "Bakkai", "title": "Kano river Numazu", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kano_river_Numazu.jpg", "facility": ""}
  ],
  "2018_14": [
    {"src": "photos/2018_14-1.jpg", "thumb": "photos/2018_14-1-thumb.jpg", "by": "金沢市", "title": "辰巳用水２", "license": "CC BY 2.1 jp", "licenseUrl": "https://creativecommons.org/licenses/by/2.1/jp/", "source": "https://commons.wikimedia.org/wiki/File:%E8%BE%B0%E5%B7%B3%E7%94%A8%E6%B0%B4%EF%BC%92.jpg", "facility": ""},
    {"src": "photos/2018_14-2.jpg", "thumb": "photos/2018_14-2-thumb.jpg", "by": "金沢市", "title": "辰巳用水001", "license": "CC BY 2.1 jp", "licenseUrl": "https://creativecommons.org/licenses/by/2.1/jp/", "source": "https://commons.wikimedia.org/wiki/File:%E8%BE%B0%E5%B7%B3%E7%94%A8%E6%B0%B4001.jpg", "facility": ""}
  ],
  "2018_18": [
    {"src": "photos/2018_18-1.jpg", "thumb": "photos/2018_18-1-thumb.jpg", "by": "Pinqui", "title": "Esakitoudai 01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Esakitoudai_01.jpg", "facility": ""},
    {"src": "photos/2018_18-2.jpg", "thumb": "photos/2018_18-2-thumb.jpg", "by": "Pinqui", "title": "Esakitoudai 03", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Esakitoudai_03.jpg", "facility": ""}
  ],
  "2018_20": [
    {"src": "photos/2018_20-1.jpg", "thumb": "photos/2018_20-1-thumb.jpg", "by": "DVMG", "title": "Kawanishicho - panoramio (1)", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kawanishicho_-_panoramio_(1).jpg", "facility": ""}
  ],
  "2018_22": [
    {"src": "photos/2018_22-1.jpg", "thumb": "photos/2018_22-1-thumb.jpg", "by": "新幹線", "title": "Yoshinogawa Bridge 20200119", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Yoshinogawa_Bridge_20200119.jpg", "facility": ""}
  ],
  "2018_23": [
    {"src": "photos/2018_23-1.jpg", "thumb": "photos/2018_23-1-thumb.jpg", "by": "STA3816", "title": "Magaribuchi Dam 01", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Magaribuchi_Dam_01.jpg", "facility": ""},
    {"src": "photos/2018_23-2.jpg", "thumb": "photos/2018_23-2-thumb.jpg", "by": "STA3816", "title": "Magaribuchi Dam 05", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Magaribuchi_Dam_05.jpg", "facility": ""},
    {"src": "photos/2018_23-3.jpg", "thumb": "photos/2018_23-3-thumb.jpg", "by": "Pgm800", "title": "曲渕ダム", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%9B%B2%E6%B8%95%E3%83%80%E3%83%A0.jpg", "facility": ""}
  ],
  "2019_01": [
    {"src": "photos/2019_01-1.jpg", "thumb": "photos/2019_01-1-thumb.jpg", "by": "河川一等兵", "title": "Iwamatsu-51-r1", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Iwamatsu-51-r1.JPG", "facility": ""}
  ],
  "2019_03": [
    {"src": "photos/2019_03-1.jpg", "thumb": "photos/2019_03-1-thumb.jpg", "by": "佐藤莞嬴", "title": "20210504岩田橋01", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:20210504%E5%B2%A9%E7%94%B0%E6%A9%8B01.jpg", "facility": "岩田橋"},
    {"src": "photos/2019_03-2.jpg", "thumb": "photos/2019_03-2-thumb.jpg", "by": "佐藤莞嬴", "title": "20210504岩田橋04", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:20210504%E5%B2%A9%E7%94%B0%E6%A9%8B04.jpg", "facility": "岩田橋"},
    {"src": "photos/2019_03-3.jpg", "thumb": "photos/2019_03-3-thumb.jpg", "by": "佐藤莞嬴", "title": "20210504不動沢橋01", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:20210504%E4%B8%8D%E5%8B%95%E6%B2%A2%E6%A9%8B01.jpg", "facility": "不動沢橋"},
    {"src": "photos/2019_03-4.jpg", "thumb": "photos/2019_03-4-thumb.jpg", "by": "佐藤莞嬴", "title": "20210504不動沢橋02", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:20210504%E4%B8%8D%E5%8B%95%E6%B2%A2%E6%A9%8B02.jpg", "facility": "不動沢橋"},
    {"src": "photos/2019_03-5.jpg", "thumb": "photos/2019_03-5-thumb.jpg", "by": "佐藤莞嬴", "title": "20210504不動沢橋06", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:20210504%E4%B8%8D%E5%8B%95%E6%B2%A2%E6%A9%8B06.jpg", "facility": "不動沢橋"}
  ],
  "2019_07": [
    {"src": "photos/2019_07-1.jpg", "thumb": "photos/2019_07-1-thumb.jpg", "by": "Qurren", "title": "Yubiso River Doai Check Dam Yubuki Falls", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Yubiso_River_Doai_Check_Dam_Yubuki_Falls.jpg", "facility": ""}
  ],
  "2019_08": [
    {"src": "photos/2019_08-1.jpg", "thumb": "photos/2019_08-1-thumb.jpg", "by": "Akatsuki-3rd", "title": "函南駅より丹那トンネル坑口をのぞむ", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%87%BD%E5%8D%97%E9%A7%85%E3%82%88%E3%82%8A%E4%B8%B9%E9%82%A3%E3%83%88%E3%83%B3%E3%83%8D%E3%83%AB%E5%9D%91%E5%8F%A3%E3%82%92%E3%81%AE%E3%81%9E%E3%82%80.JPG", "facility": ""}
  ],
  "2019_11": [
    {"src": "photos/2019_11-1.jpg", "thumb": "photos/2019_11-1-thumb.jpg", "by": "Alpsdake", "title": "Chusetsu Bridge", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Chusetsu_Bridge.jpg", "facility": ""},
    {"src": "photos/2019_11-2.jpg", "thumb": "photos/2019_11-2-thumb.jpg", "by": "Alpsdake", "title": "Chusetsu Bridge from Mount Kinka (cropped)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Chusetsu_Bridge_from_Mount_Kinka_(cropped).jpg", "facility": ""}
  ],
  "2019_12": [
    {"src": "photos/2019_12-1.jpg", "thumb": "photos/2019_12-1-thumb.jpg", "by": "Alpsdake", "title": "Ibi Bridge (Gifu Prefectural Road Route 31 s3)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Ibi_Bridge_(Gifu_Prefectural_Road_Route_31_s3).jpg", "facility": ""},
    {"src": "photos/2019_12-2.jpg", "thumb": "photos/2019_12-2-thumb.jpg", "by": "Monami", "title": "Ibi-Ohashi01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ibi-Ohashi01.JPG", "facility": ""},
    {"src": "photos/2019_12-3.jpg", "thumb": "photos/2019_12-3-thumb.jpg", "by": "Alpsdake", "title": "Ibi Ohashi", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ibi_Ohashi.JPG", "facility": ""}
  ],
  "2019_17": [
    {"src": "photos/2019_17-1.jpg", "thumb": "photos/2019_17-1-thumb.jpg", "by": "Kansai explorer", "title": "平野橋東横堀01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%B9%B3%E9%87%8E%E6%A9%8B%E6%9D%B1%E6%A8%AA%E5%A0%8001.jpg", "facility": ""}
  ],
  "2019_22": [
    {"src": "photos/2019_22-1.jpg", "thumb": "photos/2019_22-1-thumb.jpg", "by": "Nodaunji", "title": "20160430上津屋橋", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:20160430%E4%B8%8A%E6%B4%A5%E5%B1%8B%E6%A9%8B.jpg", "facility": ""}
  ],
  "2019_26": [
    {"src": "photos/2019_26-1.jpg", "thumb": "photos/2019_26-1-thumb.jpg", "by": "河川一等兵", "title": "Kamishiiba-2815-r1", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Kamishiiba-2815-r1.JPG", "facility": ""},
    {"src": "photos/2019_26-2.jpg", "thumb": "photos/2019_26-2-thumb.jpg", "by": "Martin Lopatka", "title": "Kamishiiba Dam - May 5, 2017", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Kamishiiba_Dam_-_May_5,_2017.jpg", "facility": ""}
  ],
  "2020_01": [
    {"src": "photos/2020_01-1.jpg", "thumb": "photos/2020_01-1-thumb.jpg", "by": "河川一等兵", "title": "Kanayama Dam 2015", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kanayama_Dam_2015.jpg", "facility": ""}
  ],
  "2020_02": [
    {"src": "photos/2020_02-1.jpg", "thumb": "photos/2020_02-1-thumb.jpg", "by": "Takisaw", "title": "Kamui Ohashi Bridge 20110529", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kamui_Ohashi_Bridge_20110529.jpg", "facility": ""}
  ],
  "2020_04": [
    {"src": "photos/2020_04-1.jpg", "thumb": "photos/2020_04-1-thumb.jpg", "by": "Suikotei", "title": "Terasaka-bashi 01", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Terasaka-bashi_01.jpg", "facility": ""},
    {"src": "photos/2020_04-2.jpg", "thumb": "photos/2020_04-2-thumb.jpg", "by": "Suikotei", "title": "Terasaka-bashi 02", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Terasaka-bashi_02.jpg", "facility": ""}
  ],
  "2020_05": [
    {"src": "photos/2020_05-1.jpg", "thumb": "photos/2020_05-1-thumb.jpg", "by": "妖精書士", "title": "Sagiishibashi bridge 02", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:Sagiishibashi_bridge_02.jpg", "facility": ""},
    {"src": "photos/2020_05-2.jpg", "thumb": "photos/2020_05-2-thumb.jpg", "by": "妖精書士", "title": "Sagiishibashi bridge 01", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:Sagiishibashi_bridge_01.jpg", "facility": ""}
  ],
  "2020_12": [
    {"src": "photos/2020_12-1.jpg", "thumb": "photos/2020_12-1-thumb.jpg", "by": "Tsuyoshi WikiCommons", "title": "常盤橋", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%B8%B8%E7%9B%A4%E6%A9%8B.JPG", "facility": ""},
    {"src": "photos/2020_12-2.jpg", "thumb": "photos/2020_12-2-thumb.jpg", "by": "江戸村のとくぞう", "title": "Tokiwa Bridge (Nihonbashi River) 210529b", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Tokiwa_Bridge_(Nihonbashi_River)_210529b.jpg", "facility": ""}
  ],
  "2020_13": [
    {"src": "photos/2020_13-1.jpg", "thumb": "photos/2020_13-1-thumb.jpg", "by": "Raki_Man", "title": "Kurobe Dam - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kurobe_Dam_-_panoramio.jpg", "facility": ""},
    {"src": "photos/2020_13-2.jpg", "thumb": "photos/2020_13-2-thumb.jpg", "by": "くろふね", "title": "黒部ダム03", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E9%BB%92%E9%83%A8%E3%83%80%E3%83%A003.jpg", "facility": ""}
  ],
  "2020_14": [
    {"src": "photos/2020_14-1.jpg", "thumb": "photos/2020_14-1-thumb.jpg", "by": "charl", "title": "狩野川放水路", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E7%8B%A9%E9%87%8E%E5%B7%9D%E6%94%BE%E6%B0%B4%E8%B7%AF.jpg", "facility": ""},
    {"src": "photos/2020_14-2.jpg", "thumb": "photos/2020_14-2-thumb.jpg", "by": "charl", "title": "狩野川放水路のトンネル中1", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E7%8B%A9%E9%87%8E%E5%B7%9D%E6%94%BE%E6%B0%B4%E8%B7%AF%E3%81%AE%E3%83%88%E3%83%B3%E3%83%8D%E3%83%AB%E4%B8%AD1.jpg", "facility": ""}
  ],
  "2020_15": [
    {"src": "photos/2020_15-1.jpg", "thumb": "photos/2020_15-1-thumb.jpg", "by": "Tomio344456", "title": "View of Nakagawa Canal from the Top of Nagara-hashi Bridge (3), Nakagawa Ward Nagoya 2021", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:View_of_Nakagawa_Canal_from_the_Top_of_Nagara-hashi_Bridge_(3),_Nakagawa_Ward_Nagoya_2021.jpg", "facility": ""},
    {"src": "photos/2020_15-2.jpg", "thumb": "photos/2020_15-2-thumb.jpg", "by": "Alpsdake", "title": "Cruise Nagoya and Nakagawa Canal", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Cruise_Nagoya_and_Nakagawa_Canal.jpg", "facility": ""}
  ],
  "2020_17": [
    {"src": "photos/2020_17-1.jpg", "thumb": "photos/2020_17-1-thumb.jpg", "by": "Mc681", "title": "Semba Center Building No.3 in 201411", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Semba_Center_Building_No.3_in_201411.JPG", "facility": ""},
    {"src": "photos/2020_17-2.jpg", "thumb": "photos/2020_17-2-thumb.jpg", "by": "Mc681", "title": "Semba Center Building No.4 in 201411", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Semba_Center_Building_No.4_in_201411.JPG", "facility": ""}
  ],
  "2020_22": [
    {"src": "photos/2020_22-1.jpg", "thumb": "photos/2020_22-1-thumb.jpg", "by": "Qurren", "title": "Sasogawa Dam", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Sasogawa_Dam.jpg", "facility": ""},
    {"src": "photos/2020_22-2.jpg", "thumb": "photos/2020_22-2-thumb.jpg", "by": "Qurren", "title": "Sasogawa Dam added spillway", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Sasogawa_Dam_added_spillway.jpg", "facility": ""}
  ],
  "2020_23": [
    {"src": "photos/2020_23-1.jpg", "thumb": "photos/2020_23-1-thumb.jpg", "by": "Yoshio Kohara", "title": "太田川（安芸太田町）", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%A4%AA%E7%94%B0%E5%B7%9D%EF%BC%88%E5%AE%89%E8%8A%B8%E5%A4%AA%E7%94%B0%E7%94%BA%EF%BC%89.jpg", "facility": ""}
  ],
  "2020_24": [
    {"src": "photos/2020_24-1.jpg", "thumb": "photos/2020_24-1-thumb.jpg", "by": "Dokudami", "title": "Sankabasi01", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sankabasi01.jpg", "facility": ""},
    {"src": "photos/2020_24-2.jpg", "thumb": "photos/2020_24-2-thumb.jpg", "by": "osami", "title": "Kagawa kannonnji三架橋", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Kagawa_kannonnji%E4%B8%89%E6%9E%B6%E6%A9%8B.jpg", "facility": ""}
  ],
  "2021_01": [
    {"src": "photos/2021_01-1.jpg", "thumb": "photos/2021_01-1-thumb.jpg", "by": "Ippukucho", "title": "NukabiraDam1", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:NukabiraDam1.JPG", "facility": ""},
    {"src": "photos/2021_01-2.jpg", "thumb": "photos/2021_01-2-thumb.jpg", "by": "ei ym", "title": "糠平ダム - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E7%B3%A0%E5%B9%B3%E3%83%80%E3%83%A0_-_panoramio.jpg", "facility": ""}
  ],
  "2021_03": [
    {"src": "photos/2021_03-1.jpg", "thumb": "photos/2021_03-1-thumb.jpg", "by": "河川一等兵", "title": "Tase-238-r1", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Tase-238-r1.JPG", "facility": "田瀬ダム"},
    {"src": "photos/2021_03-2.jpg", "thumb": "photos/2021_03-2-thumb.jpg", "by": "河川一等兵", "title": "Tase Dam", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tase_Dam.jpg", "facility": "田瀬ダム"},
    {"src": "photos/2021_03-3.jpg", "thumb": "photos/2021_03-3-thumb.jpg", "by": "河川一等兵", "title": "Yuda-247-r1", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Yuda-247-r1.JPG", "facility": "湯田ダム"},
    {"src": "photos/2021_03-4.jpg", "thumb": "photos/2021_03-4-thumb.jpg", "by": "河川一等兵", "title": "Yuda Dam No2", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Yuda_Dam_No2.jpg", "facility": "湯田ダム"},
    {"src": "photos/2021_03-5.jpg", "thumb": "photos/2021_03-5-thumb.jpg", "by": "河川一等兵", "title": "Shijyushida-249-r1", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Shijyushida-249-r1.JPG", "facility": "四十四田ダム"},
    {"src": "photos/2021_03-6.jpg", "thumb": "photos/2021_03-6-thumb.jpg", "by": "河川一等兵", "title": "Gosho-256-r1", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Gosho-256-r1.JPG", "facility": "御所ダム"},
    {"src": "photos/2021_03-7.jpg", "thumb": "photos/2021_03-7-thumb.jpg", "by": "Ippukucho", "title": "GoshoDam2", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:GoshoDam2.JPG", "facility": "御所ダム"}
  ],
  "2021_08": [
    {"src": "photos/2021_08-1.jpg", "thumb": "photos/2021_08-1-thumb.jpg", "by": "Prcmise", "title": "Rokugo Sluice 3", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Rokugo_Sluice_3.jpg", "facility": ""},
    {"src": "photos/2021_08-2.jpg", "thumb": "photos/2021_08-2-thumb.jpg", "by": "Prcmise", "title": "Rokugo Sluice 2", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Rokugo_Sluice_2.jpg", "facility": ""}
  ],
  "2021_12": [
    {"src": "photos/2021_12-1.jpg", "thumb": "photos/2021_12-1-thumb.jpg", "by": "Evelyn-rose", "title": "Otogawa-Tonobashi-5", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:Otogawa-Tonobashi-5.jpg", "facility": ""},
    {"src": "photos/2021_12-2.jpg", "thumb": "photos/2021_12-2-thumb.jpg", "by": "Evelyn-rose", "title": "Okazaki-Tonobashi-4399", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:Okazaki-Tonobashi-4399.jpg", "facility": ""}
  ],
  "2021_13": [
    {"src": "photos/2021_13-1.jpg", "thumb": "photos/2021_13-1-thumb.jpg", "by": "へぼ飯", "title": "山川橋（岐阜県加茂郡川辺町）", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%B1%B1%E5%B7%9D%E6%A9%8B%EF%BC%88%E5%B2%90%E9%98%9C%E7%9C%8C%E5%8A%A0%E8%8C%82%E9%83%A1%E5%B7%9D%E8%BE%BA%E7%94%BA%EF%BC%89.jpg", "facility": ""}
  ],
  "2021_16": [
    {"src": "photos/2021_16-1.jpg", "thumb": "photos/2021_16-1-thumb.jpg", "by": "Tamago Moffle", "title": "Suspension bridge of Tanize 2010.07.28 - Merged-1", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Suspension_bridge_of_Tanize_2010.07.28_-_Merged-1.jpg", "facility": ""},
    {"src": "photos/2021_16-2.jpg", "thumb": "photos/2021_16-2-thumb.jpg", "by": "へーはちろう", "title": "十津川村、谷瀬の吊り橋", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%8D%81%E6%B4%A5%E5%B7%9D%E6%9D%91%E3%80%81%E8%B0%B7%E7%80%AC%E3%81%AE%E5%90%8A%E3%82%8A%E6%A9%8B.jpg", "facility": ""},
    {"src": "photos/2021_16-3.jpg", "thumb": "photos/2021_16-3-thumb.jpg", "by": "Raita Futo from Tokyo, Japan", "title": "Tanize Suspension Bridge (51930398475)", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Tanize_Suspension_Bridge_(51930398475).jpg", "facility": ""}
  ],
  "2021_17": [
    {"src": "photos/2021_17-1.jpg", "thumb": "photos/2021_17-1-thumb.jpg", "by": "田附宏秀", "title": "三井寺疎水 - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E4%B8%89%E4%BA%95%E5%AF%BA%E7%96%8E%E6%B0%B4_-_panoramio.jpg", "facility": "琵琶湖第１疏水"},
    {"src": "photos/2021_17-2.jpg", "thumb": "photos/2021_17-2-thumb.jpg", "by": "Yasu", "title": "No. 1 Tunnel on the Biwako Canal", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:No._1_Tunnel_on_the_Biwako_Canal.jpg", "facility": "琵琶湖第１疏水"},
    {"src": "photos/2021_17-3.jpg", "thumb": "photos/2021_17-3-thumb.jpg", "by": "Shigeru-a24", "title": "Yamasina Lake Biwa Canal and Cherry Blossom Viewing (5)", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Yamasina_Lake_Biwa_Canal_and_Cherry_Blossom_Viewing_(5).JPG", "facility": ""}
  ],
  "2021_20": [
    {"src": "photos/2021_20-1.jpg", "thumb": "photos/2021_20-1-thumb.jpg", "by": "W0746203-1", "title": "JRW Wadamisaki Line view-01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:JRW_Wadamisaki_Line_view-01.JPG", "facility": ""},
    {"src": "photos/2021_20-2.jpg", "thumb": "photos/2021_20-2-thumb.jpg", "by": "Olegushka", "title": "DD13637 WadamisakiLine WadaBr 198502", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:DD13637_WadamisakiLine_WadaBr_198502.jpg", "facility": ""}
  ],
  "2021_21": [
    {"src": "photos/2021_21-1.jpg", "thumb": "photos/2021_21-1-thumb.jpg", "by": "Alpsdake", "title": "Tanisaka Tunnel (Shiga Prefectural Road Route 265)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Tanisaka_Tunnel_(Shiga_Prefectural_Road_Route_265).jpg", "facility": "谷坂隧道"}
  ],
  "2021_22": [
    {"src": "photos/2021_22-1.jpg", "thumb": "photos/2021_22-1-thumb.jpg", "by": "Taisyo", "title": "本川橋01", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%9C%AC%E5%B7%9D%E6%A9%8B01.JPG", "facility": "本川橋"},
    {"src": "photos/2021_22-2.jpg", "thumb": "photos/2021_22-2-thumb.jpg", "by": "Taisyo", "title": "本川橋02", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%9C%AC%E5%B7%9D%E6%A9%8B02.JPG", "facility": "本川橋"}
  ],
  "2021_24": [
    {"src": "photos/2021_24-1.jpg", "thumb": "photos/2021_24-1-thumb.jpg", "by": "sk01", "title": "鳴滝橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E9%B3%B4%E6%BB%9D%E6%A9%8B_-_panoramio.jpg", "facility": "鳴滝橋"},
    {"src": "photos/2021_24-2.jpg", "thumb": "photos/2021_24-2-thumb.jpg", "by": "sk01", "title": "長瀬橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E9%95%B7%E7%80%AC%E6%A9%8B_-_panoramio.jpg", "facility": "長瀬橋"},
    {"src": "photos/2021_24-3.jpg", "thumb": "photos/2021_24-3-thumb.jpg", "by": "sk01", "title": "原尻橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%8E%9F%E5%B0%BB%E6%A9%8B_-_panoramio.jpg", "facility": "原尻橋"}
  ],
  "2021_25": [
    {"src": "photos/2021_25-1.jpg", "thumb": "photos/2021_25-1-thumb.jpg", "by": "sk01", "title": "花峯橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E8%8A%B1%E5%B3%AF%E6%A9%8B_-_panoramio.jpg", "facility": ""}
  ],
  "2022_06": [
    {"src": "photos/2022_06-1.jpg", "thumb": "photos/2022_06-1-thumb.jpg", "by": "京浜にけ", "title": "Tochigi Watarase Reservoir Second Regulation Pond 1", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tochigi_Watarase_Reservoir_Second_Regulation_Pond_1.JPG", "facility": ""},
    {"src": "photos/2022_06-2.jpg", "thumb": "photos/2022_06-2-thumb.jpg", "by": "京浜にけ", "title": "Tochigi Watarase Reservoir Third Regulation Pond 1", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tochigi_Watarase_Reservoir_Third_Regulation_Pond_1.JPG", "facility": ""}
  ],
  "2022_07": [
    {"src": "photos/2022_07-1.jpg", "thumb": "photos/2022_07-1-thumb.jpg", "by": "e97h0017", "title": "Toyomibashi-bridge08052701", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Toyomibashi-bridge08052701.jpg", "facility": ""},
    {"src": "photos/2022_07-2.jpg", "thumb": "photos/2022_07-2-thumb.jpg", "by": "e97h0017", "title": "Toyomibashi-bridge08052702", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Toyomibashi-bridge08052702.jpg", "facility": ""},
    {"src": "photos/2022_07-3.jpg", "thumb": "photos/2022_07-3-thumb.jpg", "by": "e97h0017", "title": "Toyomibashi-bridge08061301", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Toyomibashi-bridge08061301.JPG", "facility": ""}
  ],
  "2022_08": [
    {"src": "photos/2022_08-1.jpg", "thumb": "photos/2022_08-1-thumb.jpg", "by": "Takkitakitaki", "title": "Shimizuyado", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Shimizuyado.jpg", "facility": ""}
  ],
  "2022_10": [
    {"src": "photos/2022_10-1.jpg", "thumb": "photos/2022_10-1-thumb.jpg", "by": "KKPCW（Kyu3）", "title": "Nakagawa Bridge (Nagoya) - 2", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Nakagawa_Bridge_(Nagoya)_-_2.jpg", "facility": ""},
    {"src": "photos/2022_10-2.jpg", "thumb": "photos/2022_10-2-thumb.jpg", "by": "KKPCW（Kyu3）", "title": "Nakagawa Bridge (Nagoya) - 4", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Nakagawa_Bridge_(Nagoya)_-_4.jpg", "facility": ""}
  ],
  "2022_17": [
    {"src": "photos/2022_17-1.jpg", "thumb": "photos/2022_17-1-thumb.jpg", "by": "Alpsdake", "title": "Hakogase Bridge s3", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Hakogase_Bridge_s3.jpg", "facility": ""},
    {"src": "photos/2022_17-2.jpg", "thumb": "photos/2022_17-2-thumb.jpg", "by": "Alpsdake", "title": "Hakogase Bridge", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Hakogase_Bridge.jpg", "facility": ""}
  ],
  "2022_19": [
    {"src": "photos/2022_19-1.jpg", "thumb": "photos/2022_19-1-thumb.jpg", "by": "Koheisu", "title": "Maya Oohashi", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Maya_Oohashi.JPG", "facility": ""}
  ],
  "2022_20": [
    {"src": "photos/2022_20-1.jpg", "thumb": "photos/2022_20-1-thumb.jpg", "by": "Mihimaru Vista", "title": "Kobe Bridge west", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kobe_Bridge_west.jpg", "facility": ""},
    {"src": "photos/2022_20-2.jpg", "thumb": "photos/2022_20-2-thumb.jpg", "by": "Mihimaru Vista", "title": "Kobe Portopia Bridge", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kobe_Portopia_Bridge.jpg", "facility": ""}
  ],
  "2022_22": [
    {"src": "photos/2022_22-1.jpg", "thumb": "photos/2022_22-1-thumb.jpg", "by": "sk01", "title": "山国橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%B1%B1%E5%9B%BD%E6%A9%8B_-_panoramio.jpg", "facility": ""},
    {"src": "photos/2022_22-2.jpg", "thumb": "photos/2022_22-2-thumb.jpg", "by": "そらみみ (Soramimi)", "title": "Yamakunigawa River from bridge of Nippo Main Line", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Yamakunigawa_River_from_bridge_of_Nippo_Main_Line.JPG", "facility": ""},
    {"src": "photos/2022_22-3.jpg", "thumb": "photos/2022_22-3-thumb.jpg", "by": "そらみみ", "title": "View from Tenshu of Nakatsu Castle (west) 1", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:View_from_Tenshu_of_Nakatsu_Castle_(west)_1.jpg", "facility": ""}
  ],
  "2023_03": [
    {"src": "photos/2023_03-1.jpg", "thumb": "photos/2023_03-1-thumb.jpg", "by": "Qurren", "title": "Okura Dam left dam right view", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Okura_Dam_left_dam_right_view.jpg", "facility": ""},
    {"src": "photos/2023_03-2.jpg", "thumb": "photos/2023_03-2-thumb.jpg", "by": "Qurren", "title": "Okura Dam right dam left view", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Okura_Dam_right_dam_left_view.jpg", "facility": ""}
  ],
  "2023_04": [
    {"src": "photos/2023_04-1.jpg", "thumb": "photos/2023_04-1-thumb.jpg", "by": "Kropsoq", "title": "Okutadami Dam 001", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Okutadami_Dam_001.jpg", "facility": ""},
    {"src": "photos/2023_04-2.jpg", "thumb": "photos/2023_04-2-thumb.jpg", "by": "Tyutyanya", "title": "20180429 Okutadami Dam and billboard", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:20180429_Okutadami_Dam_and_billboard.jpg", "facility": ""},
    {"src": "photos/2023_04-3.jpg", "thumb": "photos/2023_04-3-thumb.jpg", "by": "BehBeh", "title": "20090905奥只見ダム", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:20090905%E5%A5%A5%E5%8F%AA%E8%A6%8B%E3%83%80%E3%83%A0.jpg", "facility": ""}
  ],
  "2023_05": [
    {"src": "photos/2023_05-1.jpg", "thumb": "photos/2023_05-1-thumb.jpg", "by": "nesnad", "title": "Kuramaebashi - Tokyo - Oct 2015", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kuramaebashi_-_Tokyo_-_Oct_2015.jpg", "facility": ""},
    {"src": "photos/2023_05-2.jpg", "thumb": "photos/2023_05-2-thumb.jpg", "by": "Nesnad", "title": "Kuramaebashi from above - april 9 2016", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kuramaebashi_from_above_-_april_9_2016.jpg", "facility": ""}
  ],
  "2023_06": [
    {"src": "photos/2023_06-1.jpg", "thumb": "photos/2023_06-1-thumb.jpg", "by": "kauhoshi", "title": "城ヶ島大橋と白秋碑", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%9F%8E%E3%83%B6%E5%B3%B6%E5%A4%A7%E6%A9%8B%E3%81%A8%E7%99%BD%E7%A7%8B%E7%A2%91.jpg", "facility": ""}
  ],
  "2023_08": [
    {"src": "photos/2023_08-1.jpg", "thumb": "photos/2023_08-1-thumb.jpg", "by": "Qurren", "title": "Oi Dam", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Oi_Dam.jpg", "facility": ""},
    {"src": "photos/2023_08-2.jpg", "thumb": "photos/2023_08-2-thumb.jpg", "by": "Qurren", "title": "Oi Dam power station", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Oi_Dam_power_station.jpg", "facility": ""}
  ],
  "2023_13": [
    {"src": "photos/2023_13-1.jpg", "thumb": "photos/2023_13-1-thumb.jpg", "by": "Hirojin taja", "title": "2015 1115 Higashi-Takasu Bridge 05", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:2015_1115_Higashi-Takasu_Bridge_05.jpg", "facility": ""},
    {"src": "photos/2023_13-2.jpg", "thumb": "photos/2023_13-2-thumb.jpg", "by": "Hirojin taja", "title": "2015 1115 Higashi-Takasu Bridge 02", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:2015_1115_Higashi-Takasu_Bridge_02.jpg", "facility": ""},
    {"src": "photos/2023_13-3.jpg", "thumb": "photos/2023_13-3-thumb.jpg", "by": "Hirojin taja", "title": "2015 1115 Higashi-Takasu Bridge 01", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:2015_1115_Higashi-Takasu_Bridge_01.jpg", "facility": ""}
  ],
  "2023_14": [
    {"src": "photos/2023_14-1.jpg", "thumb": "photos/2023_14-1-thumb.jpg", "by": "Harimawood", "title": "高砂港向島突堤 東防波堤２", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E9%AB%98%E7%A0%82%E6%B8%AF%E5%90%91%E5%B3%B6%E7%AA%81%E5%A0%A4_%E6%9D%B1%E9%98%B2%E6%B3%A2%E5%A0%A4%EF%BC%92.jpg", "facility": ""}
  ],
  "2023_17": [
    {"src": "photos/2023_17-1.jpg", "thumb": "photos/2023_17-1-thumb.jpg", "by": "663highland", "title": "Biwako-oohashi01s3200", "license": "CC BY 2.5", "licenseUrl": "https://creativecommons.org/licenses/by/2.5/", "source": "https://commons.wikimedia.org/wiki/File:Biwako-oohashi01s3200.jpg", "facility": ""},
    {"src": "photos/2023_17-2.jpg", "thumb": "photos/2023_17-2-thumb.jpg", "by": "Moja", "title": "Biwako bridge1", "license": "CC BY 2.5", "licenseUrl": "https://creativecommons.org/licenses/by/2.5/", "source": "https://commons.wikimedia.org/wiki/File:Biwako_bridge1.jpg", "facility": ""}
  ],
  "2023_19": [
    {"src": "photos/2023_19-1.jpg", "thumb": "photos/2023_19-1-thumb.jpg", "by": "katorisi", "title": "Sagawa-bridge,Shimanto-cho,Japan", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Sagawa-bridge,Shimanto-cho,Japan.JPG", "facility": ""}
  ],
  "2024_04": [
    {"src": "photos/2024_04-1.jpg", "thumb": "photos/2024_04-1-thumb.jpg", "by": "jmho", "title": "Komagata bashi1", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Komagata_bashi1.JPG", "facility": ""},
    {"src": "photos/2024_04-2.jpg", "thumb": "photos/2024_04-2-thumb.jpg", "by": "Aimaimyi", "title": "Komagata bashi -01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Komagata_bashi_-01.jpg", "facility": ""},
    {"src": "photos/2024_04-3.jpg", "thumb": "photos/2024_04-3-thumb.jpg", "by": "Yoshio Kohara", "title": "駒形橋 - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E9%A7%92%E5%BD%A2%E6%A9%8B_-_panoramio.jpg", "facility": ""}
  ],
  "2024_05": [
    {"src": "photos/2024_05-1.jpg", "thumb": "photos/2024_05-1-thumb.jpg", "by": "Oos", "title": "Sagami-Ohashi from distance 2", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Sagami-Ohashi_from_distance_2.JPG", "facility": ""},
    {"src": "photos/2024_05-2.jpg", "thumb": "photos/2024_05-2-thumb.jpg", "by": "Oos", "title": "Sagami-Ohashi from distance", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Sagami-Ohashi_from_distance.jpg", "facility": ""}
  ],
  "2024_07": [
    {"src": "photos/2024_07-1.jpg", "thumb": "photos/2024_07-1-thumb.jpg", "by": "Tomio344456", "title": "Distant View of Inuyama-hashi Bridge from the Side of Mount Hakusanbira-san, Kitahakusanbira Inuyama Inuyama Aichi 2022", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Distant_View_of_Inuyama-hashi_Bridge_from_the_Side_of_Mount_Hakusanbira-san,_Kitahakusanbira_Inuyama_Inuyama_Aichi_2022.jpg", "facility": ""},
    {"src": "photos/2024_07-2.jpg", "thumb": "photos/2024_07-2-thumb.jpg", "by": "Hide-sp", "title": "Inuyama Bridge 2", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Inuyama_Bridge_2.JPG", "facility": ""},
    {"src": "photos/2024_07-3.jpg", "thumb": "photos/2024_07-3-thumb.jpg", "by": "そらみみ", "title": "Inuyamabashi Bridge from Inuyama, Aichi", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Inuyamabashi_Bridge_from_Inuyama,_Aichi.JPG", "facility": ""}
  ],
  "2024_11": [
    {"src": "photos/2024_11-1.jpg", "thumb": "photos/2024_11-1-thumb.jpg", "by": "ignis", "title": "Minato Ohashi Osaka JPN 001", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Minato_Ohashi_Osaka_JPN_001.jpg", "facility": ""},
    {"src": "photos/2024_11-2.jpg", "thumb": "photos/2024_11-2-thumb.jpg", "by": "KENPEI", "title": "Minato Ohashi Osaka1", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Minato_Ohashi_Osaka1.jpg", "facility": ""},
    {"src": "photos/2024_11-3.jpg", "thumb": "photos/2024_11-3-thumb.jpg", "by": "Likadog from Taiwan", "title": "Minato Bridge", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Minato_Bridge.jpg", "facility": ""}
  ],
  "2025_02": [
    {"src": "photos/2025_02-1.jpg", "thumb": "photos/2025_02-1-thumb.jpg", "by": "Douglas P. Perkins", "title": "CapeNosappuLighthouse", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:CapeNosappuLighthouse.jpg", "facility": ""}
  ],
  "2025_03": [
    {"src": "photos/2025_03-1.jpg", "thumb": "photos/2025_03-1-thumb.jpg", "by": "Qurren", "title": "Nakaiwa Dam", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Nakaiwa_Dam.jpg", "facility": ""}
  ],
  "2025_04": [
    {"src": "photos/2025_04-1.jpg", "thumb": "photos/2025_04-1-thumb.jpg", "by": "Suikotei", "title": "Komahashi Power Station Ochiai Suirokyo", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Komahashi_Power_Station_Ochiai_Suirokyo.jpg", "facility": ""}
  ],
  "2025_11": [
    {"src": "photos/2025_11-1.jpg", "thumb": "photos/2025_11-1-thumb.jpg", "by": "河川一等兵", "title": "Ohno Dam", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ohno_Dam.jpg", "facility": ""},
    {"src": "photos/2025_11-2.jpg", "thumb": "photos/2025_11-2-thumb.jpg", "by": "河川一等兵", "title": "Ohno Dam right side", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ohno_Dam_right_side.JPG", "facility": ""},
    {"src": "photos/2025_11-3.jpg", "thumb": "photos/2025_11-3-thumb.jpg", "by": "Indiana jo", "title": "Ōno Dam", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%C5%8Cno_Dam.jpg", "facility": ""}
  ],
  "2025_14": [
    {"src": "photos/2025_14-1.jpg", "thumb": "photos/2025_14-1-thumb.jpg", "by": "Nankou Oronain (as36…", "title": "近鉄吉野線 吉野川橋梁 Yoshinogawa-kyōryō 2011.2.26 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E8%BF%91%E9%89%84%E5%90%89%E9%87%8E%E7%B7%9A_%E5%90%89%E9%87%8E%E5%B7%9D%E6%A9%8B%E6%A2%81_Yoshinogawa-ky%C5%8Dry%C5%8D_2011.2.26_-_panoramio.jpg", "facility": ""}
  ],
  "2025_17": [
    {"src": "photos/2025_17-1.jpg", "thumb": "photos/2025_17-1-thumb.jpg", "by": "sk01", "title": "轟橋 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E8%BD%9F%E6%A9%8B_-_panoramio.jpg", "facility": ""}
  ],
  "2026_03": [
    {"src": "photos/2026_03-1.jpg", "thumb": "photos/2026_03-1-thumb.jpg", "by": "fitm", "title": "Nagaikemitsukebashi", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Nagaikemitsukebashi.JPG", "facility": ""}
  ],
  "2026_04": [
    {"src": "photos/2026_04-1.jpg", "thumb": "photos/2026_04-1-thumb.jpg", "by": "LERK", "title": "Naka bridge Tori 2chome Ashikaga city Tochigi prefecture Japan 20250831 105438", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Naka_bridge_Tori_2chome_Ashikaga_city_Tochigi_prefecture_Japan_20250831_105438.jpg", "facility": ""},
    {"src": "photos/2026_04-2.jpg", "thumb": "photos/2026_04-2-thumb.jpg", "by": "LERK", "title": "Naka bridge Tori 2chome Ashikaga city Tochigi prefecture Japan 20250831 105729", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Naka_bridge_Tori_2chome_Ashikaga_city_Tochigi_prefecture_Japan_20250831_105729.jpg", "facility": ""},
    {"src": "photos/2026_04-3.jpg", "thumb": "photos/2026_04-3-thumb.jpg", "by": "LERK", "title": "Naka bridge Tori 2chome Ashikaga city Tochigi prefecture Japan 20250831 105839", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Naka_bridge_Tori_2chome_Ashikaga_city_Tochigi_prefecture_Japan_20250831_105839.jpg", "facility": ""}
  ],
  "2026_05": [
    {"src": "photos/2026_05-1.jpg", "thumb": "photos/2026_05-1-thumb.jpg", "by": "京浜にけ", "title": "Chichibu Titibubasi 1", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Chichibu_Titibubasi_1.jpg", "facility": ""}
  ],
  "2026_09": [
    {"src": "photos/2026_09-1.jpg", "thumb": "photos/2026_09-1-thumb.jpg", "by": "さかおり", "title": "Sakurabashi Bridge in Toyama City", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sakurabashi_Bridge_in_Toyama_City.jpg", "facility": ""}
  ],
  "2026_13": [
    {"src": "photos/2026_13-1.jpg", "thumb": "photos/2026_13-1-thumb.jpg", "by": "Kansai explorer", "title": "Ikehara bridge, Shimokitayama01", "license": "CC BY 2.5", "licenseUrl": "https://creativecommons.org/licenses/by/2.5/", "source": "https://commons.wikimedia.org/wiki/File:Ikehara_bridge,_Shimokitayama01.JPG", "facility": ""},
    {"src": "photos/2026_13-2.jpg", "thumb": "photos/2026_13-2-thumb.jpg", "by": "Gohachiyasu1214", "title": "Ikehara bridge-02", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Ikehara_bridge-02.jpg", "facility": ""}
  ],
  "2026_14": [
    {"src": "photos/2026_14-1.jpg", "thumb": "photos/2026_14-1-thumb.jpg", "by": "8-hachiro", "title": "Hanakakebashi (Gose, Nara) 201707", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Hanakakebashi_(Gose,_Nara)_201707.jpg", "facility": ""}
  ],
  "2026_20": [
    {"src": "photos/2026_20-1.jpg", "thumb": "photos/2026_20-1-thumb.jpg", "by": "WEI, WAN-CHEN（魏琬臻）", "title": "來義鄉二峰圳＜2＞", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E4%BE%86%E7%BE%A9%E9%84%89%E4%BA%8C%E5%B3%B0%E5%9C%B3%EF%BC%9C2%EF%BC%9E.jpg", "facility": "二峰圳"},
    {"src": "photos/2026_20-2.jpg", "thumb": "photos/2026_20-2-thumb.jpg", "by": "WEI, WAN-CHEN（魏琬臻）", "title": "來義鄉二峰圳＜1＞", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E4%BE%86%E7%BE%A9%E9%84%89%E4%BA%8C%E5%B3%B0%E5%9C%B3%EF%BC%9C1%EF%BC%9E.jpg", "facility": "二峰圳"}
  ],
  "2000_1": [
    {"src": "photos/2000_1-1.jpg", "thumb": "photos/2000_1-1.jpg", "by": "国土交通省ウェブサイト「小樽港」", "creditLabel": "出典", "title": "北防波堤を含む小樽港の航空写真", "license": "PDL1.0", "licenseUrl": "https://www.digital.go.jp/resources/open_data/public_data_license_v1.0", "source": "https://www.mlit.go.jp/sogoseisaku/region/infratourism/infralist/hokkaido/index05.html", "facility": ""}
  ],
  "2001_2": [
    {"src": "photos/2001_2-1.jpg", "thumb": "photos/2001_2-1-thumb.jpg", "by": "河川一等兵", "title": "Ominato Ⅰ suigenchi weir", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Ominato_%E2%85%A0_suigenchi_weir.jpg", "facility": ""}
  ],
  "2001_3": [
    {"src": "photos/2001_3-1.jpg", "thumb": "photos/2001_3-1-thumb.jpg", "by": "Damsuki", "title": "Marunumadam-2005-10-28 10-33-48 Fri -1130463228-.01", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Marunumadam-2005-10-28_10-33-48_Fri_-1130463228-.01.jpg", "facility": ""}
  ],
  "2003_4": [
    {"src": "photos/2003_4-1.jpg", "thumb": "photos/2003_4-1-thumb.jpg", "by": "Crown of Lenten rose（Commons の作者欄による推定）", "title": "Aterazawa Mogami Bridge Morning 2006", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Aterazawa_Mogami_Bridge_Morning_2006.jpg", "facility": ""}
  ],
  "2003_5": [
    {"src": "photos/2003_5-1.jpg", "thumb": "photos/2003_5-1-thumb.jpg", "by": "京浜にけ", "title": "Goka Sekiyado Water Gate 1", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Goka_Sekiyado_Water_Gate_1.JPG", "facility": "関宿水門"}
  ],
  "2003_11": [
    {"src": "photos/2003_11-1.jpg", "thumb": "photos/2003_11-1-thumb.jpg", "by": "Kazue Asano", "title": "Ruin of an arsenal on Tomogashima Island - from flickr 31000150145", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Ruin_of_an_arsenal_on_Tomogashima_Island_-_from_flickr_31000150145.jpg", "facility": ""}
  ],
  "2003_12": [
    {"src": "photos/2003_12-1.jpg", "thumb": "photos/2003_12-1-thumb.jpg", "by": "Tatushin", "title": "Skazu Sluiceway", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Skazu_Sluiceway.JPG", "facility": ""}
  ],
  "2003_13": [
    {"src": "photos/2003_13-1.jpg", "thumb": "photos/2003_13-1-thumb.jpg", "by": "Spiegel", "title": "千本ダム 松江市西忌部町 Sep 12, 2026", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%8D%83%E6%9C%AC%E3%83%80%E3%83%A0_%E6%9D%BE%E6%B1%9F%E5%B8%82%E8%A5%BF%E5%BF%8C%E9%83%A8%E7%94%BA_Sep_12%2C_2026.jpg", "facility": ""}
  ],
  "2004_11": [
    {"src": "photos/2004_11-1.jpg", "thumb": "photos/2004_11-1-thumb.jpg", "by": "beck", "title": "Kyoto Railway Museum roundhouse 2021-11-22", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:Kyoto_Railway_Museum_roundhouse_2021-11-22.jpg", "facility": ""}
  ],
  "2005_9": [
    {"src": "photos/2005_9-1.jpg", "thumb": "photos/2005_9-1-thumb.jpg", "by": "Missile shot", "title": "Oohikagetunnel-yuhodo", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Oohikagetunnel-yuhodo.JPG", "facility": "旧大日影トンネル"}
  ],
  "2009_22": [
    {"src": "photos/2009_22-1.jpg", "thumb": "photos/2009_22-1-thumb.jpg", "by": "Tam0031", "title": "Yatake Daiichi tunnel", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Yatake_Daiichi_tunnel.jpg", "facility": ""}
  ],
  "jd-149": [
    {"src": "photos/jd-149-1.jpg", "thumb": "photos/jd-149-1-thumb.jpg", "by": "Ocavis Leechroot", "title": "Fujikura Dam (藤倉ダム) - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Fujikura_Dam_(%E8%97%A4%E5%80%89%E3%83%80%E3%83%A0)_-_panoramio.jpg", "facility": "堰堤"},
    {"src": "photos/jd-149-2.jpg", "thumb": "photos/jd-149-2-thumb.jpg", "by": "掬茶", "title": "Fujikura Dam", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Fujikura_Dam.jpg", "facility": "堰堤"}
  ],
  "jd-554": [
    {"src": "photos/jd-554-1.jpg", "thumb": "photos/jd-554-1-thumb.jpg", "by": "三人日", "title": "Hachimanbashi20111228", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Hachimanbashi20111228.jpg", "facility": ""}
  ],
  "jd-574": [
    {"src": "photos/jd-574-1.jpg", "thumb": "photos/jd-574-1-thumb.jpg", "by": "Vantey", "title": "Dock Yard Garden 20091024 2", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Dock_Yard_Garden_20091024_2.jpg", "facility": ""},
    {"src": "photos/jd-574-2.jpg", "thumb": "photos/jd-574-2-thumb.jpg", "by": "Thirteen-fri", "title": "DOCKYARD GARDEN", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:DOCKYARD_GARDEN.jpg", "facility": ""}
  ],
  "jd-709": [
    {"src": "photos/jd-709-1.jpg", "thumb": "photos/jd-709-1-thumb.jpg", "by": "Hisenv", "title": "HUGANNUNNGA NAKAZIMAKOUMON KOYA P1190093", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:HUGANNUNNGA_NAKAZIMAKOUMON_KOYA_P1190093.JPG", "facility": "閘門と閘門操作室"},
    {"src": "photos/jd-709-2.jpg", "thumb": "photos/jd-709-2-thumb.jpg", "by": "ネプチューン", "title": "Nakajimakomon", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Nakajimakomon.jpg", "facility": "閘門"}
  ],
  "jd-1002": [
    {"src": "photos/jd-1002-1.jpg", "thumb": "photos/jd-1002-1-thumb.jpg", "by": "松岡明芳", "title": "Momosuke-bridge桃介橋長野県南木曽町-1922(大正11)年P8149366", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Momosuke-bridge%E6%A1%83%E4%BB%8B%E6%A9%8B%E9%95%B7%E9%87%8E%E7%9C%8C%E5%8D%97%E6%9C%A8%E6%9B%BD%E7%94%BA-1922(%E5%A4%A7%E6%AD%A311)%E5%B9%B4P8149366.JPG", "facility": "桃介橋"},
    {"src": "photos/jd-1002-2.jpg", "thumb": "photos/jd-1002-2-thumb.jpg", "by": "Qurren", "title": "Yomikaki power station Kakizore aqueduct", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Yomikaki_power_station_Kakizore_aqueduct.jpg", "facility": "柿其水路橋"},
    {"src": "photos/jd-1002-3.jpg", "thumb": "photos/jd-1002-3-thumb.jpg", "by": "珈琲牛乳", "title": "読書発電所 - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E8%AA%AD%E6%9B%B8%E7%99%BA%E9%9B%BB%E6%89%80_-_panoramio.jpg", "facility": "発電所"}
  ],
  "jd-2073": [
    {"src": "photos/jd-2073-1.jpg", "thumb": "photos/jd-2073-1-thumb.jpg", "by": "arashio1", "title": "026 日本橋3 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:026_%E6%97%A5%E6%9C%AC%E6%A9%8B3_-_panoramio.jpg", "facility": ""},
    {"src": "photos/jd-2073-2.jpg", "thumb": "photos/jd-2073-2-thumb.jpg", "by": "福原邦展", "title": "日本橋 - panoramio (9)", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%97%A5%E6%9C%AC%E6%A9%8B_-_panoramio_(9).jpg", "facility": "青銅製の装飾"},
    {"src": "photos/jd-2073-3.jpg", "thumb": "photos/jd-2073-3-thumb.jpg", "by": "作者不明", "title": "NewlyBuilt Nihonbashi 1911 Tokyo", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:NewlyBuilt_Nihonbashi_1911_Tokyo.jpg", "facility": "完成当時（1911年）"}
  ],
  "jd-2430": [
    {"src": "photos/jd-2430-1.jpg", "thumb": "photos/jd-2430-1-thumb.jpg", "by": "Nnn at Japanese Wikipedia", "title": "Mikohata6596", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Mikohata6596.JPG", "facility": ""},
    {"src": "photos/jd-2430-2.jpg", "thumb": "photos/jd-2430-2-thumb.jpg", "by": "shiro524", "title": "Mikohata Bridge 20150530121923", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Mikohata_Bridge_20150530121923.jpg", "facility": ""}
  ],
  "jd-3578": [
    {"src": "photos/jd-3578-1.jpg", "thumb": "photos/jd-3578-1-thumb.jpg", "by": "masamic", "title": "Tsujyunkyo", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Tsujyunkyo.jpg", "facility": ""},
    {"src": "photos/jd-3578-2.jpg", "thumb": "photos/jd-3578-2-thumb.jpg", "by": "Totti", "title": "Tsujunkyo 2020 2", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Tsujunkyo_2020_2.jpg", "facility": "放水"}
  ],
  "jd-3596": [
    {"src": "photos/jd-3596-1.jpg", "thumb": "photos/jd-3596-1-thumb.jpg", "by": "kentamabuchi", "title": "Hakusui Dam, Oita Prefecture; October 2008 (02)", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Hakusui_Dam,_Oita_Prefecture;_October_2008_(02).jpg", "facility": "主堰堤"},
    {"src": "photos/jd-3596-2.jpg", "thumb": "photos/jd-3596-2-thumb.jpg", "by": "kentamabuchi", "title": "Hakusui Dam, Oita Prefecture; October 2008 (05)", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Hakusui_Dam,_Oita_Prefecture;_October_2008_(05).jpg", "facility": "主堰堤"}
  ],
  "jd-3676": [
    {"src": "photos/jd-3676-1.jpg", "thumb": "photos/jd-3676-1-thumb.jpg", "by": "katorisi", "title": "Yokotone-lock-gate,katori-city,chiba,japan", "license": "CC BY 2.5", "licenseUrl": "https://creativecommons.org/licenses/by/2.5/", "source": "https://commons.wikimedia.org/wiki/File:Yokotone-lock-gate,katori-city,chiba,japan.JPG", "facility": ""},
    {"src": "photos/jd-3676-2.jpg", "thumb": "photos/jd-3676-2-thumb.jpg", "by": "アリオト", "title": "Yokotone Lock shock-absorbing material", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Yokotone_Lock_shock-absorbing_material.jpg", "facility": "閘室"}
  ],
  "jd-3679": [
    {"src": "photos/jd-3679-1.jpg", "thumb": "photos/jd-3679-1-thumb.jpg", "by": "Tawashi", "title": "船頭平閘門01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E8%88%B9%E9%A0%AD%E5%B9%B3%E9%96%98%E9%96%8001.jpg", "facility": ""}
  ],
  "jd-3693": [
    {"src": "photos/jd-3693-1.jpg", "thumb": "photos/jd-3693-1-thumb.jpg", "by": "Volfgang", "title": "Yokohama Nipponmaru 3", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Yokohama_Nipponmaru_3.jpg", "facility": "日本丸が入った第一号船渠"},
    {"src": "photos/jd-3693-2.jpg", "thumb": "photos/jd-3693-2-thumb.jpg", "by": "Kanchi1979", "title": "JP-Yokohama-Minato-Mirai-Nippon-Maru-Memorial-Park", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:JP-Yokohama-Minato-Mirai-Nippon-Maru-Memorial-Park.jpg", "facility": "日本丸が入った第一号船渠"}
  ],
  "jd-3704": [
    {"src": "photos/jd-3704-1.jpg", "thumb": "photos/jd-3704-1-thumb.jpg", "by": "Takisaw", "title": "Amagi Tunnel 20171125", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Amagi_Tunnel_20171125.jpg", "facility": ""},
    {"src": "photos/jd-3704-2.jpg", "thumb": "photos/jd-3704-2-thumb.jpg", "by": "hoge asdf", "title": "Amagi Tunnel (2463778389)", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Amagi_Tunnel_(2463778389).jpg", "facility": "坑門"}
  ],
  "jd-3808": [
    {"src": "photos/jd-3808-1.jpg", "thumb": "photos/jd-3808-1-thumb.jpg", "by": "Rsa", "title": "Chikugo River Lift Bridge DOWN 20110914", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Chikugo_River_Lift_Bridge_DOWN_20110914.jpg", "facility": ""},
    {"src": "photos/jd-3808-2.jpg", "thumb": "photos/jd-3808-2-thumb.jpg", "by": "Rsa", "title": "Chikugo River Lift Bridge 003", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Chikugo_River_Lift_Bridge_003.JPG", "facility": "吊上塔"}
  ],
  "jd-3959": [
    {"src": "photos/jd-3959-1.jpg", "thumb": "photos/jd-3959-1-thumb.jpg", "by": "Qurren", "title": "Yatsusawa power station number 1 aqueduct", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Yatsusawa_power_station_number_1_aqueduct.jpg", "facility": "第一号水路橋"}
  ],
  "jd-4060": [
    {"src": "photos/jd-4060-1.jpg", "thumb": "photos/jd-4060-1-thumb.jpg", "by": "Qurren", "title": "Yaotsu Old Power Plant Museum", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Yaotsu_Old_Power_Plant_Museum.jpg", "facility": "発電所本館"},
    {"src": "photos/jd-4060-2.jpg", "thumb": "photos/jd-4060-2-thumb.jpg", "by": "Qurren", "title": "Yaotsu secondary power station", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Yaotsu_secondary_power_station.jpg", "facility": "放水口発電所"},
    {"src": "photos/jd-4060-3.jpg", "thumb": "photos/jd-4060-3-thumb.jpg", "by": "継之助", "title": "Turbine of Yaotsu Old Power Plant", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Turbine_of_Yaotsu_Old_Power_Plant.jpg", "facility": "発電所本館の発電装置"}
  ],
  "jd-4075": [
    {"src": "photos/jd-4075-1.jpg", "thumb": "photos/jd-4075-1-thumb.jpg", "by": "Toto-tarou", "title": "Hounenike Dam-01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Hounenike_Dam-01.jpg", "facility": ""},
    {"src": "photos/jd-4075-2.jpg", "thumb": "photos/jd-4075-2-thumb.jpg", "by": "Toto-tarou", "title": "Hounenike Dam-17", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Hounenike_Dam-17.jpg", "facility": ""}
  ],
  "jd-4100": [
    {"src": "photos/jd-4100-1.jpg", "thumb": "photos/jd-4100-1-thumb.jpg", "by": "663highland", "title": "Nunobiki dam06bs3200", "license": "CC BY 2.5", "licenseUrl": "https://creativecommons.org/licenses/by/2.5/", "source": "https://commons.wikimedia.org/wiki/File:Nunobiki_dam06bs3200.jpg", "facility": "五本松堰堤"},
    {"src": "photos/jd-4100-2.jpg", "thumb": "photos/jd-4100-2-thumb.jpg", "by": "663highland", "title": "Nunobiki dam01s3200", "license": "CC BY 2.5", "licenseUrl": "https://creativecommons.org/licenses/by/2.5/", "source": "https://commons.wikimedia.org/wiki/File:Nunobiki_dam01s3200.jpg", "facility": "五本松堰堤"}
  ],
  "jd-4106": [
    {"src": "photos/jd-4106-1.jpg", "thumb": "photos/jd-4106-1-thumb.jpg", "by": "Tomio344456", "title": "Shinagawa Lighthouse in Meiji Mura 2022", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Shinagawa_Lighthouse_in_Meiji_Mura_2022.jpg", "facility": "博物館明治村に移築"},
    {"src": "photos/jd-4106-2.jpg", "thumb": "photos/jd-4106-2-thumb.jpg", "by": "Yoshio Kohara", "title": "明治村 品川燈台 (1870) 重要文化財 - panoramio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%98%8E%E6%B2%BB%E6%9D%91_%E5%93%81%E5%B7%9D%E7%87%88%E5%8F%B0_(1870)_%E9%87%8D%E8%A6%81%E6%96%87%E5%8C%96%E8%B2%A1_-_panoramio.jpg", "facility": "博物館明治村に移築"}
  ],
  "jd-4110": [
    {"src": "photos/jd-4110-1.jpg", "thumb": "photos/jd-4110-1-thumb.jpg", "by": "たぬちゃん", "title": "Suehiro bridge (open)", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Suehiro_bridge_(open).JPG", "facility": "可動桁を上げた状態"},
    {"src": "photos/jd-4110-2.jpg", "thumb": "photos/jd-4110-2-thumb.jpg", "by": "z tanuki", "title": "Suehiro bridge , 末広橋梁 - panoramio (4)", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Suehiro_bridge_,_%E6%9C%AB%E5%BA%83%E6%A9%8B%E6%A2%81_-_panoramio_(4).jpg", "facility": ""}
  ],
  "jd-4119": [
    {"src": "photos/jd-4119-1.jpg", "thumb": "photos/jd-4119-1-thumb.jpg", "by": "おてらやさん", "title": "20090523四日市港潮吹き堤防", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:20090523%E5%9B%9B%E6%97%A5%E5%B8%82%E6%B8%AF%E6%BD%AE%E5%90%B9%E3%81%8D%E5%A0%A4%E9%98%B2.JPG", "facility": "潮吹き防波堤"},
    {"src": "photos/jd-4119-2.jpg", "thumb": "photos/jd-4119-2-thumb.jpg", "by": "おてらやさん", "title": "20090523四日市港潮吹き堤防2", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:20090523%E5%9B%9B%E6%97%A5%E5%B8%82%E6%B8%AF%E6%BD%AE%E5%90%B9%E3%81%8D%E5%A0%A4%E9%98%B22.JPG", "facility": "潮吹き防波堤"}
  ],
  "jd-4129": [
    {"src": "photos/jd-4129-1.jpg", "thumb": "photos/jd-4129-1-thumb.jpg", "by": "Atzy", "title": "Honjo dam", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Honjo_dam.jpg", "facility": "堰堤"}
  ],
  "jd-4183": [
    {"src": "photos/jd-4183-1.jpg", "thumb": "photos/jd-4183-1-thumb.jpg", "by": "kanesue", "title": "勝鬨橋 - panoramio (10)", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%8B%9D%E9%AC%A8%E6%A9%8B_-_panoramio_(10).jpg", "facility": ""},
    {"src": "photos/jd-4183-2.jpg", "thumb": "photos/jd-4183-2-thumb.jpg", "by": "jmho", "title": "Kachidoki bashi powerunit", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:Kachidoki_bashi_powerunit.jpg", "facility": "跳開部の機械装置"}
  ],
  "jd-4230": [
    {"src": "photos/jd-4230-1.jpg", "thumb": "photos/jd-4230-1-thumb.jpg", "by": "Suikotei", "title": "Kyu Mikawajima Osui Shobunjo Pump-jo Shisetsu", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kyu_Mikawajima_Osui_Shobunjo_Pump-jo_Shisetsu.jpg", "facility": "阻水扉室（奥）"}
  ],
  "jd-4294": [
    {"src": "photos/jd-4294-1.jpg", "thumb": "photos/jd-4294-1-thumb.jpg", "by": "野口保興", "title": "Ibigawa bridge, Gifu around 1900", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Ibigawa_bridge,_Gifu_around_1900.png", "facility": "1900年ごろ"}
  ],
  "jd-4308": [
    {"src": "photos/jd-4308-1.jpg", "thumb": "photos/jd-4308-1-thumb.jpg", "by": "のりまき", "title": "Ishioka I power station", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ishioka_I_power_station.jpg", "facility": "本館"}
  ],
  "jd-4327": [
    {"src": "photos/jd-4327-1.jpg", "thumb": "photos/jd-4327-1-thumb.jpg", "by": "Hiroshi Nakai", "title": "Shiraiwa Sabo Dam 白岩堰堤 Oct 15, 2015 (2)", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Shiraiwa_Sabo_Dam_%E7%99%BD%E5%B2%A9%E5%A0%B0%E5%A0%A4_Oct_15,_2015_(2).jpg", "facility": "白岩堰堤"},
    {"src": "photos/jd-4327-2.jpg", "thumb": "photos/jd-4327-2-thumb.jpg", "by": "Hiroshi Nakai", "title": "Shiraiwa Sabo Dam 白岩堰堤 Oct 15, 2015 (1)", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Shiraiwa_Sabo_Dam_%E7%99%BD%E5%B2%A9%E5%A0%B0%E5%A0%A4_Oct_15,_2015_(1).jpg", "facility": "白岩堰堤"}
  ],
  "jd-4341": [
    {"src": "photos/jd-4341-1.jpg", "thumb": "photos/jd-4341-1-thumb.jpg", "by": "Navian", "title": "Oomukae tunnel", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Oomukae_tunnel.JPG", "facility": "オオムカエ隧道"},
    {"src": "photos/jd-4341-2.jpg", "thumb": "photos/jd-4341-2-thumb.jpg", "by": "Navian", "title": "Hirase tunnel", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Hirase_tunnel.JPG", "facility": "平瀬隧道"}
  ],
  "jd-4573": [
    {"src": "photos/jd-4573-1.jpg", "thumb": "photos/jd-4573-1-thumb.jpg", "by": "Qurren", "title": "Ushibuse River French style stair-stepped channel works", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Ushibuse_River_French_style_stair-stepped_channel_works.jpg", "facility": ""},
    {"src": "photos/jd-4573-2.jpg", "thumb": "photos/jd-4573-2-thumb.jpg", "by": "Douglas Perkins", "title": "French-Style Waterfall 02", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:French-Style_Waterfall_02.jpg", "facility": ""}
  ],
  "jd-4703": [
    {"src": "photos/jd-4703-1.jpg", "thumb": "photos/jd-4703-1-thumb.jpg", "by": "手練", "title": "Furukawa-bridge", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Furukawa-bridge.JPG", "facility": ""},
    {"src": "photos/jd-4703-2.jpg", "thumb": "photos/jd-4703-2-thumb.jpg", "by": "Asturio Cantabrio", "title": "Furukawa Bridge ac (1)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Furukawa_Bridge_ac_(1).jpg", "facility": ""},
    {"src": "photos/jd-4703-3.jpg", "thumb": "photos/jd-4703-3-thumb.jpg", "by": "手練", "title": "Harkort maker`s plate", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Harkort_maker%60s_plate.JPG", "facility": "ハーコート社の銘板"}
  ],
  "jd-4786": [
    {"src": "photos/jd-4786-1.jpg", "thumb": "photos/jd-4786-1-thumb.jpg", "by": "Si-take. at Japanese Wikipedia(しいたけ)", "title": "Movable bridge in Nagahama Ehime,JAPAN", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Movable_bridge_in_Nagahama_Ehime,JAPAN.jpg", "facility": ""},
    {"src": "photos/jd-4786-2.jpg", "thumb": "photos/jd-4786-2-thumb.jpg", "by": "Amake", "title": "Nagahama Drawbridge in Ōzu", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Nagahama_Drawbridge_in_%C5%8Czu.jpg", "facility": ""}
  ],
  "jd-5142": [
    {"src": "photos/jd-5142-1.jpg", "thumb": "photos/jd-5142-1-thumb.jpg", "by": "nimame", "title": "Usui Bridge No. 3 2014-05-01 01", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Usui_Bridge_No._3_2014-05-01_01.jpg", "facility": "第三橋梁"},
    {"src": "photos/jd-5142-2.jpg", "thumb": "photos/jd-5142-2-thumb.jpg", "by": "Toshinori baba", "title": "Usui Bridge No03.", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Usui_Bridge_No03..JPG", "facility": "第三橋梁"}
  ],
  "jd-5232": [
    {"src": "photos/jd-5232-1.jpg", "thumb": "photos/jd-5232-1-thumb.jpg", "by": "くろふね", "title": "犬吠埼灯台 - panoramio (1)", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E7%8A%AC%E5%90%A0%E5%9F%BC%E7%81%AF%E5%8F%B0_-_panoramio_(1).jpg", "facility": "灯台"},
    {"src": "photos/jd-5232-2.jpg", "thumb": "photos/jd-5232-2-thumb.jpg", "by": "nagano", "title": "犬吠埼", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E7%8A%AC%E5%90%A0%E5%9F%BC.JPG", "facility": ""}
  ],
  "jd-5278": [
    {"src": "photos/jd-5278-1.jpg", "thumb": "photos/jd-5278-1-thumb.jpg", "by": "Opqr", "title": "Sakado bridge", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sakado_bridge.jpg", "facility": ""},
    {"src": "photos/jd-5278-2.jpg", "thumb": "photos/jd-5278-2-thumb.jpg", "by": "濃間", "title": "坂戸橋 上流側より", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E5%9D%82%E6%88%B8%E6%A9%8B_%E4%B8%8A%E6%B5%81%E5%81%B4%E3%82%88%E3%82%8A.jpg", "facility": ""}
  ],
  "jd-5288": [
    {"src": "photos/jd-5288-1.jpg", "thumb": "photos/jd-5288-1-thumb.jpg", "by": "そらみみ (Soramimi)", "title": "Momijidani on Itsukushima Island 13", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Momijidani_on_Itsukushima_Island_13.jpg", "facility": "紅葉谷川"},
    {"src": "photos/jd-5288-2.jpg", "thumb": "photos/jd-5288-2-thumb.jpg", "by": "そらみみ", "title": "Momijidani on Itsukushima Island 8", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Momijidani_on_Itsukushima_Island_8.jpg", "facility": "紅葉谷川"}
  ],
  "jd-5289": [
    {"src": "photos/jd-5289-1.jpg", "thumb": "photos/jd-5289-1-thumb.jpg", "by": "Morumoru", "title": "Mutsure Shima Light", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Mutsure_Shima_Light.jpg", "facility": ""}
  ],
  "jd-5310": [
    {"src": "photos/jd-5310-1.jpg", "thumb": "photos/jd-5310-1-thumb.jpg", "by": "sk01", "title": "部埼灯台 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E9%83%A8%E5%9F%BC%E7%81%AF%E5%8F%B0_-_panoramio.jpg", "facility": "灯台"},
    {"src": "photos/jd-5310-2.jpg", "thumb": "photos/jd-5310-2-thumb.jpg", "by": "Morumoru", "title": "Hesaki Light", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Hesaki_Light.jpg", "facility": "灯台"}
  ],
  "jd-5318": [
    {"src": "photos/jd-5318-1.jpg", "thumb": "photos/jd-5318-1-thumb.jpg", "by": "そらみみ", "title": "Shin-Saikaibashi Bridge and Saikaibashi Bridge from observation deck east of Saikaibashi Park in Saikai, Nagasaki 3", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Shin-Saikaibashi_Bridge_and_Saikaibashi_Bridge_from_observation_deck_east_of_Saikaibashi_Park_in_Saikai,_Nagasaki_3.JPG", "facility": "手前が西海橋、奥は新西海橋"},
    {"src": "photos/jd-5318-2.jpg", "thumb": "photos/jd-5318-2-thumb.jpg", "by": "そらみみ", "title": "Shin-Saikaibashi Bridge and Saikaibashi Bridge from observation deck east of Saikaibashi Park in Saikai, Nagasaki", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Shin-Saikaibashi_Bridge_and_Saikaibashi_Bridge_from_observation_deck_east_of_Saikaibashi_Park_in_Saikai,_Nagasaki.JPG", "facility": "手前が西海橋、奥は新西海橋"}
  ],
  "jd-5357": [
    {"src": "photos/jd-5357-1.jpg", "thumb": "photos/jd-5357-1-thumb.jpg", "by": "Qurren", "title": "Omaezaki Lighthouse 3", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Omaezaki_Lighthouse_3.jpg", "facility": "灯台"},
    {"src": "photos/jd-5357-2.jpg", "thumb": "photos/jd-5357-2-thumb.jpg", "by": "Qurren", "title": "Omaezaki Lighthouse 1", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Omaezaki_Lighthouse_1.jpg", "facility": "灯台"}
  ],
  "jd-5361": [
    {"src": "photos/jd-5361-1.jpg", "thumb": "photos/jd-5361-1-thumb.jpg", "by": "Motokoka", "title": "Daiichi Daido-gawa bridge 02", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Daiichi_Daido-gawa_bridge_02.jpg", "facility": ""},
    {"src": "photos/jd-5361-2.jpg", "thumb": "photos/jd-5361-2-thumb.jpg", "by": "Motokoka", "title": "Daiichi Daido-gawa bridge 05", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Daiichi_Daido-gawa_bridge_05.jpg", "facility": ""}
  ],
  "jd-5385": [
    {"src": "photos/jd-5385-1.jpg", "thumb": "photos/jd-5385-1-thumb.jpg", "by": "Flow in edgewise", "title": "Mihonoseki Lighthouse", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Mihonoseki_Lighthouse.jpg", "facility": "灯台"},
    {"src": "photos/jd-5385-2.jpg", "thumb": "photos/jd-5385-2-thumb.jpg", "by": "Aimaimyi", "title": "Mihonoseki todai -01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Mihonoseki_todai_-01.jpg", "facility": "灯台と旧吏員退息所"}
  ],
  "jd-5388": [
    {"src": "photos/jd-5388-1.jpg", "thumb": "photos/jd-5388-1-thumb.jpg", "by": "663highland", "title": "Hinomisaki lighthouse Izumo01bs3200", "license": "CC BY 2.5", "licenseUrl": "https://creativecommons.org/licenses/by/2.5/", "source": "https://commons.wikimedia.org/wiki/File:Hinomisaki_lighthouse_Izumo01bs3200.jpg", "facility": ""},
    {"src": "photos/jd-5388-2.jpg", "thumb": "photos/jd-5388-2-thumb.jpg", "by": "Bernard Gagnon", "title": "Hinomisaki Lighthouse01", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Hinomisaki_Lighthouse01.jpg", "facility": ""}
  ],
  "jd-5390": [
    {"src": "photos/jd-5390-1.jpg", "thumb": "photos/jd-5390-1-thumb.jpg", "by": "そらみみ", "title": "Wakato Bridge and central area of Wakamatsu, Kitakyushu", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Wakato_Bridge_and_central_area_of_Wakamatsu,_Kitakyushu.jpg", "facility": ""},
    {"src": "photos/jd-5390-2.jpg", "thumb": "photos/jd-5390-2-thumb.jpg", "by": "そらみみ (Soramimi)", "title": "Wakato Bridge 20150509-1", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Wakato_Bridge_20150509-1.JPG", "facility": ""}
  ],
  "jd-5415": [
    {"src": "photos/jd-5415-1.jpg", "thumb": "photos/jd-5415-1-thumb.jpg", "by": "Alpsdake", "title": "Sugashima Lighthouse", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Sugashima_Lighthouse.JPG", "facility": ""},
    {"src": "photos/jd-5415-2.jpg", "thumb": "photos/jd-5415-2-thumb.jpg", "by": "Alpsdake", "title": "菅島灯台 ～黒崎 Sugashima Lighthouse and Kozukumi Island", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:%E8%8F%85%E5%B3%B6%E7%81%AF%E5%8F%B0_%EF%BD%9E%E9%BB%92%E5%B4%8E_Sugashima_Lighthouse_and_Kozukumi_Island.JPG", "facility": ""}
  ],
  "jd-5446": [
    {"src": "photos/jd-5446-1.jpg", "thumb": "photos/jd-5446-1-thumb.jpg", "by": "sk01", "title": "耶馬渓橋2 - panoramio", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:%E8%80%B6%E9%A6%AC%E6%B8%93%E6%A9%8B2_-_panoramio.jpg", "facility": ""},
    {"src": "photos/jd-5446-2.jpg", "thumb": "photos/jd-5446-2-thumb.jpg", "by": "そらみみ", "title": "Yabakeibashi Bridge on Yamakunigawa River", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Yabakeibashi_Bridge_on_Yamakunigawa_River.jpg", "facility": ""}
  ],
  "jd-5469": [
    {"src": "photos/jd-5469-1.jpg", "thumb": "photos/jd-5469-1-thumb.jpg", "by": "NKNS", "title": "Kyougamisaki 04", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Kyougamisaki_04.jpg", "facility": "灯台"},
    {"src": "photos/jd-5469-2.jpg", "thumb": "photos/jd-5469-2-thumb.jpg", "by": "松岡明芳", "title": "Kyougamisaki Lighthouse（経ヶ岬灯台） 2010-10-03 457", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Kyougamisaki_Lighthouse%EF%BC%88%E7%B5%8C%E3%83%B6%E5%B2%AC%E7%81%AF%E5%8F%B0%EF%BC%89_2010-10-03_457.JPG", "facility": "灯台"}
  ],
  "jd-5485": [
    {"src": "photos/jd-5485-1.jpg", "thumb": "photos/jd-5485-1-thumb.jpg", "by": "hiroaki from Tokyo, Japan", "title": "Nabeshima Lighthouse (22122413273)", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Nabeshima_Lighthouse_(22122413273).jpg", "facility": ""},
    {"src": "photos/jd-5485-2.jpg", "thumb": "photos/jd-5485-2-thumb.jpg", "by": "hiroaki from Tokyo, Japan", "title": "Nabeshima Lighthouse (22729977712)", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://commons.wikimedia.org/wiki/File:Nabeshima_Lighthouse_(22729977712).jpg", "facility": ""}
  ],
  "jd-5544": [
    {"src": "photos/jd-5544-1.jpg", "thumb": "photos/jd-5544-1-thumb.jpg", "by": "木多正", "title": "釣島灯台", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:%E9%87%A3%E5%B3%B6%E7%81%AF%E5%8F%B0.jpg", "facility": "灯台"}
  ],
  "jd-5567": [
    {"src": "photos/jd-5567-1.jpg", "thumb": "photos/jd-5567-1-thumb.jpg", "by": "Jmho", "title": "Iwabuchi suimon red", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:Iwabuchi_suimon_red.jpg", "facility": ""},
    {"src": "photos/jd-5567-2.jpg", "thumb": "photos/jd-5567-2-thumb.jpg", "by": "Misei sen", "title": "旧岩淵水門", "license": "CC0", "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/", "source": "https://commons.wikimedia.org/wiki/File:%E6%97%A7%E5%B2%A9%E6%B7%B5%E6%B0%B4%E9%96%80.jpg", "facility": ""}
  ]
};
