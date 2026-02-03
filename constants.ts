import { PresetOption } from './types';

// Scenes
export const SCENES: PresetOption[] = [
  { 
    id: 'pho_co', 
    label: 'Phố cổ ngày Tết', 
    promptFragment: 'Vietnam ancient street background during Lunar New Year, hanging red lanterns, vertical parallel sentences (câu đối), peach blossom branches, festive Tet atmosphere, soft bokeh.' 
  },
  { 
    id: 'cho_hoa', 
    label: 'Chợ hoa Tết', 
    promptFragment: 'Bustling Tet flower market background, stalls selling yellow apricot blossoms (hoa mai) and peach blossoms (hoa đào), crowded but blurred background people, vibrant spring colors.' 
  },
  { 
    id: 'studio', 
    label: 'Studio hiện đại', 
    promptFragment: 'Modern clean studio background, minimal aesthetic, subtle stylized apricot or peach blossom motifs, high-end fashion lighting, softbox lighting, solid color backdrop.' 
  },
  { 
    id: 'nha_tet', 
    label: 'Nhà ngày Tết', 
    promptFragment: 'Cozy Vietnamese living room during Tet, traditional tea table with Banh Chung (square sticky rice cake), candied fruits tray (mứt Tết), a vase of peach blossoms, warm yellow lighting.' 
  },
  { 
    id: 'cong_dinh', 
    label: 'Cổng đình/đền đầu xuân', 
    promptFragment: 'Ancient Vietnamese temple gate background, light incense smoke, solemn and respectful atmosphere, red and gold colors, early morning sunlight, traditional architecture.' 
  },
  { 
    id: 'san_truong', 
    label: 'Sân trường ngày Tết', 
    promptFragment: 'School courtyard decorated for Tet, clean and bright, Vietnamese flags and festival decorations, energetic and youthful atmosphere, clear blue sky.' 
  },
  { 
    id: 'duong_hoa', 
    label: 'Đường hoa/Lễ hội', 
    promptFragment: 'Grand flower street festival, magnificent floral displays, light confetti in the air, brilliant vibrant lighting, joyful celebration atmosphere.' 
  }
];

// Outfits
export const OUTFITS: PresetOption[] = [
  { 
    id: 'ao_dai_truyen_thong', 
    label: 'Áo dài truyền thống', 
    promptFragment: 'wearing a traditional Vietnamese Ao Dai, elegant silk fabric, cultural patterns.' 
  },
  { 
    id: 'ao_dai_cach_tan', 
    label: 'Áo dài cách tân', 
    promptFragment: 'wearing a modern stylized Ao Dai (Áo dài cách tân), contemporary fashion cut, blending tradition with modern trend.' 
  },
  { 
    id: 'vest', 
    label: 'Vest lịch sự', 
    promptFragment: 'wearing a sharp formal suit and tie, with a small Tet holiday accessory (like a red pocket square or lucky charm), elegant gentleman look.' 
  },
  { 
    id: 'casual', 
    label: 'Trang phục Casual Tết', 
    promptFragment: 'wearing stylish casual winter fashion for Tet, warm sweater or trendy jacket, red or yellow scarf, comfortable but festive look.' 
  }
];

// Moods
export const MOODS: PresetOption[] = [
  { 
    id: 'am_ap', 
    label: 'Ấm áp truyền thống', 
    promptFragment: 'Warm color grading, nostalgic feeling, golden hour lighting, soft shadows, evoking family reunion.' 
  },
  { 
    id: 'sang_trong', 
    label: 'Sang trọng (High-end)', 
    promptFragment: 'High-end magazine photography style, crisp lighting, high contrast, elegant posture, luxurious feel.' 
  },
  { 
    id: 'tre_trung', 
    label: 'Trẻ trung vui tươi', 
    promptFragment: 'High-key lighting, bright and airy, vivid colors, happy expression, energetic vibe, pop style.' 
  },
  { 
    id: 'dien_anh', 
    label: 'Điện ảnh (Cinematic)', 
    promptFragment: 'Cinematic look, anamorphic lens flare, shallow depth of field, dramatic lighting, color graded like a movie scene.' 
  }
];

// Negative Prompt
export const NEGATIVE_PROMPT = "no different person, no face swap, no altered identity, no deformed face, no asymmetry, no extra limbs, no bad hands, no text, no watermark, no logo, no blur, no heavy noise, no plastic skin, no cartoon face unless stylize is high, distorted eyes, bad anatomy.";
