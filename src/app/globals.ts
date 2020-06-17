import { Injectable } from '@angular/core';

export interface Tag {
  tag: string;
  subCategory: string;
  category: string;
  tag_id: number;
  tagger: string;
  reviewer: string;
  tagger_remark: string;
  disabled: boolean;
}

@Injectable()
export class Globals {

    username;
    
    tagsForTable;

    parseTags(tagsData) {
        var returnTags = [];
        var categories = tagsData['outline'];
        for (var cat of categories) {
            var categoryText = cat['text'];
            var subCategories = cat['outline'];
            for (var subCat of subCategories) {
                var subCategoryText = subCat['text'];
                var tags = subCat['outline'];
                for (var tag of tags) {
                    var tagText = tag['text'];
                    returnTags.push({ 'tag': tagText, 'subCategory': subCategoryText, 'category': categoryText })
                    if ('outline' in tag) { // level 4 tag
                      console.log("LEVEL 4 tags discovered, ", tag['outline']);
                    }
                }
            }
        }
        this.tagsForTable = returnTags;
    }
    
    getTagsFromDB() {
        console.log('CALLING GET TAGS');
        return this.rawTags;
    }
    rawTags = {
        "outline": [
          {
            "outline": [
              {
                "outline": [
                  {
                    "text": "Brahman"
                  },
                  {
                    "text": "Paramatma"
                  },
                  {
                    "text": "Bhagavan"
                  },
                  {
                    "text": "Virat rupa or Universal form"
                  },
                  {
                    "text": "Cause of all causes"
                  },
                  {
                    "text": "Origin of all"
                  },
                  {
                    "text": "Supreme Shelter"
                  },
                  {
                    "text": "Supremely independent"
                  },
                  {
                    "text": "Supreme controller"
                  },
                  {
                    "text": "Director of Material Nature and modes"
                  },
                  {
                    "text": "Omnipotent or All powerful"
                  },
                  {
                    "text": "Omniscient or All knowing"
                  },
                  {
                    "text": "Unlimited Nature of Lord"
                  },
                  {
                    "text": "Inconceivable nature of Lord"
                  },
                  {
                    "text": "Appears human but is transcendental"
                  },
                  {
                    "text": "Unaffected by Maya"
                  },
                  {
                    "text": "Self Satisfied"
                  },
                  {
                    "text": "Life of everything"
                  },
                  {
                    "text": "Lords energies"
                  },
                  {
                    "text": "Qualification to understand Lord"
                  },
                  {
                    "text": "Bestower of liberation"
                  },
                  {
                    "text": "Master of Mystic Yoga or Bestower of mystic yoga perfections"
                  },
                  {
                    "text": "Bestower of Spiritual World"
                  },
                  {
                    "text": "Destroyer of distresses and reactions"
                  },
                  {
                    "text": "Lord reciprocates as per desires of jivas"
                  },
                  {
                    "text": "Enjoyer of all sacrifices"
                  },
                  {
                    "text": "Feared by fear personified"
                  }
                ],
                "text": "IshvaraTattva Lords Greatness"
              },
              {
                "outline": [
                  {
                    "text": "Reservoirs of all Rasas"
                  },
                  {
                    "text": "Impartiality or Equality"
                  },
                  {
                    "text": "Compassion"
                  },
                  {
                    "text": "Affectionate to devotees or Bhakta-vatsala"
                  },
                  {
                    "text": "Protector of cows and Brahmanas"
                  },
                  {
                    "text": "Lord teaches by personal example"
                  }
                ],
                "text": "IshvaraTattva Lords Sweetness "
              },
              {
                "outline": [
                  {
                    "text": "Purpose of Lords incarnation"
                  },
                  {
                    "text": "Lila avataras"
                  },
                  {
                    "text": "Yuga avataras"
                  },
                  {
                    "text": "Manvantara avataras"
                  },
                  {
                    "text": "Shaktyavesha avataras"
                  },
                  {
                    "text": "Purusha avataras"
                  },
                  {
                    "text": "Guna avataras"
                  },
                  {
                    "text": "Disappearance of the Lord"
                  },
                  {
                    "text": "Appearance of the Lord"
                  },
                  {
                    "text": "Activities"
                  },
                  {
                    "text": "Attributes of bonafide incarnation"
                  },
                  {
                    "text": "Vishnu tattva"
                  }
                ],
                "text": "Avatara Tattva"
              },
              {
                "outline": [
                  {
                    "text": "Destiny"
                  },
                  {
                    "text": "Transmigration"
                  },
                  {
                    "text": "Cycle of birth and death"
                  },
                  {
                    "text": "Reincarnation"
                  },
                  {
                    "text": "Karma or Prescribed activities"
                  },
                  {
                    "text": "Vikarma or Prohibited activities"
                  },
                  {
                    "text": "Akarma or Liberating activities"
                  },
                  {
                    "text": "Cause of happiness and distress"
                  },
                  {
                    "text": "Atonement for sins"
                  },
                  {
                    "text": "Action and Reaction"
                  },
                  {
                    "text": "Suffering in hell"
                  },
                  {
                    "text": "Will of the Lord or Providence"
                  }
                ],
                "text": "Karma Tattva"
              },
              {
                "outline": [
                  {
                    "text": "Death"
                  },
                  {
                    "text": "Power of time"
                  },
                  {
                    "text": "Satya Yuga"
                  },
                  {
                    "text": "Treta Yuga"
                  },
                  {
                    "text": "Dvapara Yuga"
                  },
                  {
                    "text": "Kali Yuga"
                  },
                  {
                    "text": "Life duration of cosmic and earthly beings"
                  },
                  {
                    "text": "Time as representative of Lord in material world"
                  },
                  {
                    "text": "Divya Yuga"
                  },
                  {
                    "text": "Manvantara"
                  },
                  {
                    "text": "Kalpa"
                  },
                  {
                    "text": "Yuga sandhya"
                  },
                  {
                    "text": "Characteristics of Time"
                  }
                ],
                "text": "Kala Tattva"
              },
              {
                "outline": [
                  {
                    "text": "Three modes of Nature"
                  },
                  {
                    "text": "Laws of nature"
                  },
                  {
                    "text": "Process of creation"
                  },
                  {
                    "text": "Purpose of creation"
                  },
                  {
                    "text": "Process of annihilation"
                  },
                  {
                    "text": "5 Gross elements"
                  },
                  {
                    "text": "Mind"
                  },
                  {
                    "text": "Intelligence"
                  },
                  {
                    "text": "False Ego"
                  },
                  {
                    "text": "Consciousness or Mahat Tattva"
                  },
                  {
                    "text": "5 Sense objects"
                  },
                  {
                    "text": "5 Knowledge acquiring senses"
                  },
                  {
                    "text": "5 Working senses"
                  },
                  {
                    "text": "Pradhan"
                  },
                  {
                    "text": "Interaction of Jiva and Prakrti"
                  },
                  {
                    "text": "Temporary but real"
                  }
                ],
                "text": "Prakrti Tattva"
              },
              {
                "outline": [
                  {
                    "text": "Attributes of soul"
                  },
                  {
                    "text": "Constitutional position of Jiva"
                  },
                  {
                    "text": "Difference between Jiva and Lord"
                  },
                  {
                    "text": "Difference between liberated and conditioned souls"
                  },
                  {
                    "text": "Desire for material enjoyment"
                  },
                  {
                    "text": "Suffering of jiva in material world"
                  },
                  {
                    "text": "Process of jivas entanglement"
                  },
                  {
                    "text": "Impetus for liberation"
                  },
                  {
                    "text": "Process of jivas deliverance from samsara"
                  },
                  {
                    "text": "Perception of souls existence"
                  },
                  {
                    "text": "Gradation of living entities"
                  },
                  {
                    "text": "Forgetfulness of Lord"
                  },
                  {
                    "text": "Bodily conception of life or Ignorance"
                  },
                  {
                    "text": "Jiva can just desire Lord fulfills"
                  },
                  {
                    "text": "Jivas are bound to follow Vedas and Varnashram"
                  }
                ],
                "text": "Jiva Tattva"
              },
              {
                "outline": [
                  {
                    "text": "Sacrifices or Yajna"
                  },
                  {
                    "text": "Sankhya"
                  },
                  {
                    "text": "Karma Kanda"
                  },
                  {
                    "text": "Karma Yoga"
                  },
                  {
                    "text": "Jnana Yoga"
                  },
                  {
                    "text": "Ashtanga Yoga"
                  },
                  {
                    "text": "Bhakti Yoga"
                  }
                ],
                "text": "Various Processes"
              },
              {
                "outline": [
                  {
                    "text": "Personalism over Impersonalism or Mayavada"
                  },
                  {
                    "text": "Acintya Bheda-Abheda"
                  },
                  {
                    "text": "Bhagavan Realization is Complete"
                  },
                  {
                    "text": "Supremacy of Krishna over other incarnations"
                  },
                  {
                    "text": "Supremacy of Krishna over demigods"
                  },
                  {
                    "text": "Application of principles as per time place and circumstances"
                  },
                  {
                    "text": "Krishna- the supreme personality of Godhead"
                  }
                ],
                "text": "Philosophical Truths"
              },
              {
                "outline": [
                  {
                    "text": "Duty and Emotion"
                  },
                  {
                    "text": "Faithful and Thoughtful"
                  },
                  {
                    "text": "Mercy and Endeavor"
                  },
                  {
                    "text": "Intimacy and Respect or Familiarity breeds contempt"
                  },
                  {
                    "text": "Conservative and Liberal or Traditional and Relevant"
                  },
                  {
                    "text": "Spirituality and Practicality"
                  },
                  {
                    "text": "Material world and Spiritual world"
                  },
                  {
                    "text": "Devotees and non devotees"
                  },
                  {
                    "text": "Liberation and bondage"
                  },
                  {
                    "text": "mundane and spiritual literatures"
                  },
                  {
                    "text": "Pravrtti and Nivrtti marga"
                  }
                ],
                "text": "Paradoxes"
              },
              {
                "outline": [
                  {
                    "text": "Birds"
                  },
                  {
                    "text": "Animals"
                  },
                  {
                    "text": "Insects"
                  },
                  {
                    "text": "Acquatics"
                  },
                  {
                    "text": "Plants or Trees"
                  },
                  {
                    "text": "Earth"
                  },
                  {
                    "text": "Water"
                  },
                  {
                    "text": "Fire or Wood"
                  },
                  {
                    "text": "Air or Wind"
                  },
                  {
                    "text": "Sky or Ether"
                  },
                  {
                    "text": "Sun"
                  },
                  {
                    "text": "Moon"
                  },
                  {
                    "text": "Mountains"
                  },
                  {
                    "text": "Water bodies"
                  },
                  {
                    "text": "Other geographical features"
                  },
                  {
                    "text": "Flowers"
                  },
                  {
                    "text": "Clouds"
                  },
                  {
                    "text": "Boat or Ship"
                  },
                  {
                    "text": "Drama actor or Puppet"
                  },
                  {
                    "text": "5 Senses"
                  },
                  {
                    "text": "Snakes"
                  },
                  {
                    "text": "Dream or sleep"
                  },
                  {
                    "text": "Engineer"
                  },
                  {
                    "text": "Gold"
                  },
                  {
                    "text": "Night"
                  }
                ],
                "text": "Analogy"
              },
              {
                "outline": [
                  {
                    "text": "Bhakti Yoga"
                  },
                  {
                    "text": "Maya or External energy"
                  },
                  {
                    "text": "Conditioned and liberated states"
                  },
                  {
                    "text": "Birth and Death"
                  },
                  {
                    "text": "Dharma"
                  }
                ],
                "text": "Definitions"
              },
              {
                "outline": [
                  {
                    "text": "Saunaka Rishi to Suta Goswami"
                  },
                  {
                    "text": "Parikshit to Sukadev Goswami"
                  },
                  {
                    "text": "Vyasadev to Narada"
                  },
                  {
                    "text": "Vidura to Uddhava"
                  },
                  {
                    "text": "Vidura to Maitreya"
                  },
                  {
                    "text": "Narada to Brahma"
                  },
                  {
                    "text": "Brahma to Lord"
                  },
                  {
                    "text": "Yudhishtira to Narada"
                  },
                  {
                    "text": "Nimi to Navayogendras"
                  },
                  {
                    "text": "Uddhava to Krishna"
                  },
                  {
                    "text": "Devahuti to Kapila"
                  },
                  {
                    "text": "Barhishat to Narada"
                  }
                ],
                "text": "Questions In Srimad Bhagavatam"
              },
              {
                "outline": [
                  {
                    "text": "Defeating modern science"
                  },
                  {
                    "text": "Defeating atheism "
                  },
                  {
                    "text": "Defeating mayavada"
                  },
                  {
                    "text": "Defeating sahajayism"
                  }
                ],
                "text": "Defeating bogus philosophies"
              }
            ],
            "text": "Philosophical"
          },
          {
            "outline": [
              {
                "outline": [
                  {
                    "text": "Architecture or Town Planning"
                  },
                  {
                    "text": "Music"
                  },
                  {
                    "text": "Dance"
                  },
                  {
                    "text": "Painting"
                  },
                  {
                    "text": "Drama"
                  },
                  {
                    "text": "Poetry"
                  },
                  {
                    "text": "Sanskrit language"
                  }
                ],
                "text": "Art"
              },
              {
                "outline": [
                  {
                    "text": "Role of demigods in universal administration"
                  },
                  {
                    "text": "Role of Manus in universal administration"
                  },
                  {
                    "text": "Role of sages in universal administration"
                  },
                  {
                    "text": "Monarchy"
                  },
                  {
                    "text": "Role of Brahmanas"
                  },
                  {
                    "text": "Tax collection"
                  },
                  {
                    "text": "Justice and Punishment"
                  },
                  {
                    "text": "War"
                  },
                  {
                    "text": "Governance based on religious principles"
                  },
                  {
                    "text": "Ideal king"
                  },
                  {
                    "text": "Appointing successor for the kingdom"
                  },
                  {
                    "text": "Treasury and Finances"
                  },
                  {
                    "text": "Secrecy and Confidentiality"
                  },
                  {
                    "text": "Espionage"
                  }
                ],
                "text": "Administration"
              },
              {
                "outline": [
                  {
                    "text": "Goal of Varnashram"
                  },
                  {
                    "text": "Duties of Brahmana"
                  },
                  {
                    "text": "Duties of Kshatriya"
                  },
                  {
                    "text": "Duties of Vaishya"
                  },
                  {
                    "text": "Duties of Shudra"
                  },
                  {
                    "text": "Symptoms of Brahmana"
                  },
                  {
                    "text": "Symptoms of Kshatriya"
                  },
                  {
                    "text": "Symptoms of Vaishya"
                  },
                  {
                    "text": "Symptoms of Shudra"
                  },
                  {
                    "text": "Duties or Instructions for Brahmacari"
                  },
                  {
                    "text": "Duties or Instructions for Grihastha"
                  },
                  {
                    "text": "Duties or Instructions for Vanaprastha"
                  },
                  {
                    "text": "Duties or Instructions for Sannyasa"
                  },
                  {
                    "text": "Varnashram duties in emergency"
                  },
                  {
                    "text": "Varnashram is decided by ones work and qualities and not birth"
                  },
                  {
                    "text": "Glories of Brahmanas"
                  }
                ],
                "text": "Varnashram or Society"
              },
              {
                "outline": [
                  {
                    "text": "Treatment of animals"
                  },
                  {
                    "text": "Simple living"
                  },
                  {
                    "text": "Care for Mother Earth"
                  },
                  {
                    "text": "Result of exploiting earth"
                  },
                  {
                    "text": "Agriculture"
                  },
                  {
                    "text": "Water Harvesting"
                  }
                ],
                "text": "Environment and Ecology"
              },
              {
                "outline": [
                  {
                    "text": "Position of Women or Old people or Children."
                  },
                  {
                    "text": "Interaction of opposite sexes"
                  },
                  {
                    "text": "Guest Reception and Farewell"
                  },
                  {
                    "text": "Education"
                  },
                  {
                    "text": "Motherhood"
                  },
                  {
                    "text": "Festival"
                  },
                  {
                    "text": "Food"
                  },
                  {
                    "text": "Marriage or Husband-Wife relationship"
                  },
                  {
                    "text": "Culture of respect"
                  },
                  {
                    "text": "Good and bad omens"
                  },
                  {
                    "text": "Cow protection"
                  },
                  {
                    "text": "Pilgrimage"
                  },
                  {
                    "text": "Charity"
                  },
                  {
                    "text": "Dowry"
                  },
                  {
                    "text": "Clothing"
                  }
                ],
                "text": "Culture"
              },
              {
                "outline": [
                  {
                    "text": "Sacrifices or Yajna"
                  },
                  {
                    "text": "Demigod worship"
                  },
                  {
                    "text": "Deity worship"
                  },
                  {
                    "text": "Animal killing in Sacrifices"
                  },
                  {
                    "text": "Samsakaras"
                  },
                  {
                    "text": "Chanting of Mantras"
                  },
                  {
                    "text": "Custom of entering the funeral fire of husband or Sati"
                  }
                ],
                "text": "Rituals"
              },
              {
                "outline": [
                  {
                    "text": "Earthly Dynasties"
                  },
                  {
                    "text": "Manvantaras"
                  }
                ],
                "text": "History"
              },
              {
                "outline": [
                  {
                    "text": "Siva"
                  },
                  {
                    "text": "Brahma"
                  },
                  {
                    "text": "Narada"
                  },
                  {
                    "text": "Vyasa dev"
                  },
                  {
                    "text": "Sukadeva Goswami"
                  },
                  {
                    "text": "Suta Goswami"
                  },
                  {
                    "text": "Parikshit Maharaj"
                  },
                  {
                    "text": "Pandavas"
                  },
                  {
                    "text": "Uddhava"
                  },
                  {
                    "text": "Maitreya"
                  },
                  {
                    "text": "Vidura"
                  },
                  {
                    "text": "Indra"
                  },
                  {
                    "text": "Sun god"
                  },
                  {
                    "text": "Moon god"
                  },
                  {
                    "text": "Varuna"
                  },
                  {
                    "text": "Yama"
                  },
                  {
                    "text": "Sati"
                  },
                  {
                    "text": "Daksha"
                  },
                  {
                    "text": "Kumaras"
                  },
                  {
                    "text": "Svayambhu manu"
                  },
                  {
                    "text": "Prahlad Maharaj"
                  },
                  {
                    "text": "Dhruva Maharaj"
                  },
                  {
                    "text": "Prithu Maharaj"
                  },
                  {
                    "text": "Prachinabarhisat"
                  },
                  {
                    "text": "Prachetas"
                  },
                  {
                    "text": "Balaram"
                  },
                  {
                    "text": "Devaki"
                  },
                  {
                    "text": "Vasudeva"
                  },
                  {
                    "text": "Nanda Maharaj"
                  },
                  {
                    "text": "Nara Narayan Rishi"
                  }
                ],
                "text": "Important Personalities"
              },
              {
                "outline": [
                  {
                    "text": "Other devotees"
                  },
                  {
                    "text": "Other sages"
                  },
                  {
                    "text": "Other kings"
                  },
                  {
                    "text": "Other demigods"
                  },
                  {
                    "text": "Other Manus"
                  },
                  {
                    "text": "Other demons"
                  }
                ],
                "text": "Other Personalities"
              },
              {
                "outline": [
                  {
                    "text": "Naimisharanya"
                  },
                  {
                    "text": "Sarasvati river"
                  },
                  {
                    "text": "Ganga river"
                  },
                  {
                    "text": "Yamuna river"
                  },
                  {
                    "text": "Badarikashrama"
                  },
                  {
                    "text": "Bindu-sarovara"
                  },
                  {
                    "text": "Kailasa hill"
                  },
                  {
                    "text": "Haridwar"
                  },
                  {
                    "text": "Glories of Bharata Varsha"
                  },
                  {
                    "text": "Gandaki river and Pulaha Ashram"
                  }
                ],
                "text": "Important Places"
              },
              {
                "outline": [
                  {
                    "text": "Provinces or Territories"
                  },
                  {
                    "text": "Rivers"
                  },
                  {
                    "text": "Lakes"
                  },
                  {
                    "text": "Oceans"
                  },
                  {
                    "text": "Mountains"
                  },
                  {
                    "text": "Forests"
                  }
                ],
                "text": "Geography"
              },
              {
                "outline": [
                  {
                    "text": "Apara dharma"
                  },
                  {
                    "text": "Principles of religion or Dharma artha kama moksha"
                  },
                  {
                    "text": "Irreligion"
                  }
                ],
                "text": "Religion or Dharma"
              }
            ],
            "text": "Historical"
          },
          {
            "outline": [
              {
                "outline": [
                  {
                    "text": "Primary Creation or Sarga"
                  },
                  {
                    "text": "Secondary Creation or Visarga"
                  }
                ],
                "text": "Creation"
              },
              {
                "outline": [
                  {
                    "text": "Dimensions of universe"
                  },
                  {
                    "text": "Position and movement of cosmic bodies"
                  },
                  {
                    "text": "Hellish planets"
                  },
                  {
                    "text": "Description of cosmic bodies"
                  },
                  {
                    "text": "Dimension of cosmic bodies"
                  },
                  {
                    "text": "Position and movement of Sun"
                  },
                  {
                    "text": "Solar and Lunar eclipses"
                  },
                  {
                    "text": "Position and movement of Pole star"
                  }
                ],
                "text": "Cosmology"
              },
              {
                "outline": [{
                  "text": "Life within womb or Embryo"
                }],
                "text": "Anatomy"
              },
              {
                "outline": [
                  {
                    "text": "Science of mind"
                  },
                  {
                    "text": "Memory"
                  },
                  {
                    "text": "Awakefulness Dream and Deep Sleep"
                  },
                  {
                    "text": "Consciousness"
                  },
                  {
                    "text": "Controlling the mind"
                  },
                  {
                    "text": "Mind as cause of bondage and liberation"
                  },
                  {
                    "text": "Happiness and distress are perceptions of mind"
                  }
                ],
                "text": "Psychology"
              },
              {
                "outline": [
                  {
                    "text": "Ayurveda"
                  },
                  {
                    "text": "Military Science or Dhanur veda"
                  },
                  {
                    "text": "Vastu"
                  },
                  {
                    "text": "Astrology"
                  },
                  {
                    "text": "Airships and Spacecrafts"
                  },
                  {
                    "text": "Inter-planetary travel"
                  },
                  {
                    "text": "8 mystic perfections"
                  },
                  {
                    "text": "Predictions"
                  },
                  {
                    "text": "Vedic Mantras"
                  },
                  {
                    "text": "Medical science or Surgery"
                  }
                ],
                "text": "Vedic Sciences"
              },
              {
                "outline": [
                  {
                    "text": "Species of life"
                  },
                  {
                    "text": "Effect of parentage or Genetics on progeny"
                  }
                ],
                "text": "Biology"
              },
              {
                "outline": [
                  {
                    "text": "Atomic theory"
                  },
                  {
                    "text": "Calculation of time"
                  },
                  {
                    "text": "Measurements of weight"
                  },
                  {
                    "text": "Measurements of length"
                  },
                  {
                    "text": "Relativity of time"
                  }
                ],
                "text": "Physics"
              }
            ],
            "text": "Scientific"
          },
          {
            "outline": [
              {
                "outline": [
                  {
                    "text": "Hearing or Sravanam"
                  },
                  {
                    "text": "Chanting or Kirtanam"
                  },
                  {
                    "text": "Remembering or Smaranam"
                  },
                  {
                    "text": "Serving lotus feet or Pada Sevanam"
                  },
                  {
                    "text": "Deity Worship or Arcanam"
                  },
                  {
                    "text": "Prayers or Vandanam"
                  },
                  {
                    "text": "Dasyam or Servitorship"
                  },
                  {
                    "text": "becoming best friend or Sakhyam"
                  },
                  {
                    "text": "Surrender or Atma nivedanam"
                  },
                  {
                    "text": "Other items of devotional service"
                  },
                  {
                    "text": "Engaging everything including ones senses in Lords service"
                  }
                ],
                "text": "Navadha Bhakti"
              },
              {
                "outline": [
                  {
                    "text": "Parampara  or disciplic succession"
                  },
                  {
                    "text": "Importance of accepting Guru"
                  },
                  {
                    "text": "Proper mood and qualification for approaching Guru or Speaker"
                  },
                  {
                    "text": "Serving or Following instructions of Guru"
                  },
                  {
                    "text": "Qualifications and symptoms of Guru or Speaker"
                  },
                  {
                    "text": "Position of Guru"
                  },
                  {
                    "text": "Initiation"
                  },
                  {
                    "text": "Bogus Guru"
                  },
                  {
                    "text": "Duties of disciple"
                  },
                  {
                    "text": "Qualification of disciple"
                  },
                  {
                    "text": "Teaching by example"
                  },
                  {
                    "text": "Perfect inquiries"
                  },
                  {
                    "text": "Duties of Guru"
                  }
                ],
                "text": "Guru Tattva"
              },
              {
                "outline": [
                  {
                    "text": "Humility or Pridelessness"
                  },
                  {
                    "text": "Submissiveness"
                  },
                  {
                    "text": "Gratitude For Krishna"
                  },
                  {
                    "text": "Gratitude For Guru"
                  },
                  {
                    "text": "Gratitude For devotees"
                  },
                  {
                    "text": "Detachment"
                  },
                  {
                    "text": "Austerity"
                  },
                  {
                    "text": "Observing Religious principles"
                  },
                  {
                    "text": "Enthusiasm"
                  },
                  {
                    "text": "Determination"
                  },
                  {
                    "text": "Patience"
                  },
                  {
                    "text": "Satisfaction"
                  },
                  {
                    "text": "Honesty or Truthfulness"
                  },
                  {
                    "text": "Equanimity"
                  },
                  {
                    "text": "Compassion"
                  },
                  {
                    "text": "Steadiness"
                  },
                  {
                    "text": "Seeking essence or Sara grahi"
                  },
                  {
                    "text": "Repentance"
                  },
                  {
                    "text": "Tolerance"
                  },
                  {
                    "text": "Non-enviousness or Appreciation"
                  },
                  {
                    "text": "Sensitivity"
                  },
                  {
                    "text": "Accepting both reversals and success as mercy of lord or reactions of ones past actions"
                  },
                  {
                    "text": "Absorption"
                  },
                  {
                    "text": "Faith"
                  },
                  {
                    "text": "Service attitude"
                  },
                  {
                    "text": "Healthy fear of maya"
                  },
                  {
                    "text": "Exclusive surrender to Krishna"
                  },
                  {
                    "text": "Forgiveness"
                  },
                  {
                    "text": "Seeing everyone as part of Lord"
                  },
                  {
                    "text": "Sense control"
                  },
                  {
                    "text": "Working for Lords satisfaction"
                  },
                  {
                    "text": "Being non-judgemental especially towards authorities"
                  },
                  {
                    "text": "Cultivate goodness"
                  },
                  {
                    "text": "Rise above goodness"
                  }
                ],
                "text": "Dos or Favourable for Bhakti"
              },
              {
                "outline": [
                  {
                    "text": "Over-eating"
                  },
                  {
                    "text": "Idle talk or Prajalpa"
                  },
                  {
                    "text": "Negligence of rules"
                  },
                  {
                    "text": "Bad Association"
                  },
                  {
                    "text": "Meat eating"
                  },
                  {
                    "text": "Intoxication"
                  },
                  {
                    "text": "Gambling"
                  },
                  {
                    "text": "Illicit sex"
                  },
                  {
                    "text": "Offenses"
                  },
                  {
                    "text": "Material desires or Material attachments"
                  },
                  {
                    "text": "Fault finding"
                  },
                  {
                    "text": "Sense gratification"
                  },
                  {
                    "text": "Obstacles created by demigods"
                  }
                ],
                "text": "Donts or Unfavourable for Bhakti"
              },
              {
                "outline": [
                  {
                    "text": "Travels of saintly persons"
                  },
                  {
                    "text": "Non-violent communication"
                  },
                  {
                    "text": "Assertive or Chopping Technique"
                  },
                  {
                    "text": "Preaching as topmost welfare"
                  },
                  {
                    "text": "Preaching as per time place and audience"
                  },
                  {
                    "text": "Based on compassion"
                  },
                  {
                    "text": "Importance of preaching"
                  }
                ],
                "text": "Preaching"
              },
              {
                "outline": [
                  {
                    "text": "Glories of Bhagavatam"
                  },
                  {
                    "text": "History of Bhagavatam"
                  },
                  {
                    "text": "Ten subjects of Bhagavatam"
                  },
                  {
                    "text": "Importance of approaching Scriptures"
                  },
                  {
                    "text": "Phala sruti"
                  },
                  {
                    "text": "Qualification or Mood for understanding scriptures"
                  },
                  {
                    "text": "Essence or Goal of Scriptures"
                  },
                  {
                    "text": "Vedas or Upanishads"
                  },
                  {
                    "text": "Puranas"
                  },
                  {
                    "text": "Other Vedic Literatures"
                  }
                ],
                "text": "Shastra"
              },
              {
                "outline": [
                  {
                    "text": "Gradation of devotees"
                  },
                  {
                    "text": "Exalted position of devotee"
                  },
                  {
                    "text": "Dont judge devotee by material consideration"
                  },
                  {
                    "text": "Mercy of devotee"
                  },
                  {
                    "text": "Desires or Aspiration of a devotee"
                  },
                  {
                    "text": "Characteristics of devotee or Sadhu"
                  },
                  {
                    "text": "Devotees love conquers Lord"
                  },
                  {
                    "text": "Glories of devotees"
                  }
                ],
                "text": "Vaishnava Tattva"
              },
              {
                "outline": [
                  {
                    "text": "Primary Rasas"
                  },
                  {
                    "text": "Secondary Rasas"
                  },
                  {
                    "text": "Shanta"
                  },
                  {
                    "text": "Dasya"
                  },
                  {
                    "text": "Sakhya"
                  },
                  {
                    "text": "Vatsalya"
                  },
                  {
                    "text": "Madhurya"
                  },
                  {
                    "text": "Shrimati Radharani"
                  },
                  {
                    "text": "Separation or Vipralambha"
                  },
                  {
                    "text": "Union or Sambhoga"
                  },
                  {
                    "text": "Love covers knowledge"
                  },
                  {
                    "text": "Symptoms of ecstasy"
                  }
                ],
                "text": "Rasa Tattva"
              },
              {
                "outline": [
                  {
                    "text": "Uttama Bhakti"
                  },
                  {
                    "text": "Jnana Mishra Bhakti"
                  },
                  {
                    "text": "Karma Mishra Bhakti"
                  },
                  {
                    "text": "Bhakti in Mode of Goodness"
                  },
                  {
                    "text": "Bhakti in Mode of Passion"
                  },
                  {
                    "text": "Bhakti in Mode of Ignorance"
                  },
                  {
                    "text": "Vaidhi Sadhana Bhakti"
                  },
                  {
                    "text": "Raganuga Sadhana Bhakti"
                  }
                ],
                "text": "Grades of Bhakti"
              },
              {
                "outline": [
                  {
                    "text": "Glories of holy name"
                  },
                  {
                    "text": "10 Offenses"
                  },
                  {
                    "text": "Holy name Non different from Krishna"
                  }
                ],
                "text": "Nama Tattva"
              },
              {
                "outline": [
                  {
                    "text": "Glories of Association or Sat-sanga"
                  },
                  {
                    "text": "Rarity of Association or Sat-sanga"
                  }
                ],
                "text": "Association or Satsanga"
              },
              {
                "outline": [
                  {
                    "text": "Holy Dham"
                  },
                  {
                    "text": "Footwash or Ganges"
                  },
                  {
                    "text": "Tulasi"
                  },
                  {
                    "text": "Goddess of Fortune"
                  },
                  {
                    "text": "Spiritual World or Lords abode"
                  },
                  {
                    "text": "Weapons of Lord"
                  },
                  {
                    "text": "Ornaments of Lord"
                  },
                  {
                    "text": "Associates of Lord"
                  }
                ],
                "text": "Paraphernalia of Lord"
              },
              {
                "outline": [
                  {
                    "text": "Lotus Feet of Lord"
                  },
                  {
                    "text": "Lotus Face of Lord"
                  },
                  {
                    "text": "Smile of Lord"
                  },
                  {
                    "text": "Glance of Lord"
                  },
                  {
                    "text": "Beauty of Lords body"
                  },
                  {
                    "text": "Speech of Lord"
                  },
                  {
                    "text": "Eternal full of knowledge and bliss or Sat-cit-ananda vigraha"
                  }
                ],
                "text": "Form of Lord"
              },
              {
                "outline": [
                  {
                    "text": "Eagerness for hearing"
                  },
                  {
                    "text": "Glories of hearing or Hari Katha"
                  },
                  {
                    "text": "Hearing in association"
                  },
                  {
                    "text": "Hearing about the devotees"
                  },
                  {
                    "text": "Mood of hearer"
                  }
                ],
                "text": "Hearing or Sravanam"
              },
              {
                "outline": [
                  {
                    "text": "Supremacy of Bhakti Yoga"
                  },
                  {
                    "text": "Supremacy of Bhakti Yoga Over other paths"
                  },
                  {
                    "text": "Independent nature of Bhakti"
                  },
                  {
                    "text": "No qualifications required for Bhakti"
                  },
                  {
                    "text": "Removes all material desires"
                  },
                  {
                    "text": "Destroys reactions of work or Karma Granthi"
                  },
                  {
                    "text": "Destroys Anarthas"
                  },
                  {
                    "text": "Freedom from modes"
                  },
                  {
                    "text": "Gives rise to knowledge and detachment"
                  },
                  {
                    "text": "Gives full satisfaction and bliss"
                  },
                  {
                    "text": "No loss or danger on path of Bhakti"
                  },
                  {
                    "text": "Topmost welfare activity"
                  },
                  {
                    "text": "Attracts Krishna or helps attain Krishna"
                  },
                  {
                    "text": "Removes suffering"
                  },
                  {
                    "text": "Rarity of Bhakti"
                  },
                  {
                    "text": "Bhakti makes liberation appear insignificant"
                  },
                  {
                    "text": "Attracts even liberated"
                  }
                ],
                "text": "Glories of Bhakti"
              },
              {
                "outline": [
                  {
                    "text": "Beautiful features of the entire body"
                  },
                  {
                    "text": "Marked with all auspicious characteristics"
                  },
                  {
                    "text": "Ever youthful"
                  },
                  {
                    "text": "Ever fresh"
                  },
                  {
                    "text": "Possessing an eternal blissful body"
                  },
                  {
                    "text": "The protector of surrendered souls"
                  },
                  {
                    "text": "Partial to devotees"
                  },
                  {
                    "text": "The well-wisher of devotees"
                  },
                  {
                    "text": "Controlled by love"
                  },
                  {
                    "text": "Strong"
                  },
                  {
                    "text": "Most powerful"
                  },
                  {
                    "text": "All-worshipable"
                  },
                  {
                    "text": "All-opulent"
                  },
                  {
                    "text": "All-honorable"
                  },
                  {
                    "text": "Wonderful linguist"
                  },
                  {
                    "text": "Truthful"
                  },
                  {
                    "text": "Talks pleasingly"
                  },
                  {
                    "text": "Fluent"
                  },
                  {
                    "text": "Highly learned"
                  },
                  {
                    "text": "Highly intelligent"
                  },
                  {
                    "text": "Extremely clever"
                  },
                  {
                    "text": "Expert"
                  },
                  {
                    "text": "An expert judge of time and circumstances"
                  },
                  {
                    "text": "A genius"
                  },
                  {
                    "text": "All-famous"
                  },
                  {
                    "text": "Popular"
                  },
                  {
                    "text": "Self-satisfied"
                  },
                  {
                    "text": "Possessing equilibrium"
                  },
                  {
                    "text": "Happy"
                  },
                  {
                    "text": "Magnanimous"
                  },
                  {
                    "text": "Compassionate"
                  },
                  {
                    "text": "Pure"
                  },
                  {
                    "text": "Self-controlled"
                  },
                  {
                    "text": "Firmly determined"
                  },
                  {
                    "text": "Steadfast"
                  },
                  {
                    "text": "All-auspicious"
                  },
                  {
                    "text": "Artistic"
                  },
                  {
                    "text": "Effulgent"
                  },
                  {
                    "text": "Extremely pleasing"
                  },
                  {
                    "text": "Forbearing"
                  },
                  {
                    "text": "Forgiving"
                  },
                  {
                    "text": "Gentle"
                  },
                  {
                    "text": "Grateful"
                  },
                  {
                    "text": "Grave"
                  },
                  {
                    "text": "Liberal"
                  },
                  {
                    "text": "Religious"
                  },
                  {
                    "text": "Respectful"
                  },
                  {
                    "text": "Sees and speaks on the authority of Vedas, or scriptures"
                  },
                  {
                    "text": "Shy"
                  },
                  {
                    "text": "Very attractive to all women"
                  },
                  {
                    "text": "The supreme controller"
                  },
                  {
                    "text": "Changeless"
                  },
                  {
                    "text": "All-cognizant"
                  },
                  {
                    "text": "Possessing all mystic perfections"
                  },
                  {
                    "text": "Inconceivable potency"
                  },
                  {
                    "text": "Uncountable universes generate from His body"
                  },
                  {
                    "text": "Original source of all incarnations"
                  },
                  {
                    "text": "He is the giver of salvation to the enemies whom He kills"
                  },
                  {
                    "text": "He is the attractor of liberated souls"
                  },
                  {
                    "text": "Performer Of Wonderful Activities"
                  },
                  {
                    "text": "Krsna Is Surrounded by Loving Devotees"
                  },
                  {
                    "text": "Krsnas Attractive Flute"
                  },
                  {
                    "text": "Krsnas Exquisite Beauty"
                  }
                ],
                "text": "64 Qualities of Krishna"
              }
            ],
            "text": "Devotional"
          },
          {
            "outline": [
              {
                "outline": [
                  {
                    "text": "Principles of amiable conflict resolution"
                  },
                  {
                    "text": "Between Vaishnavas"
                  },
                  {
                    "text": "Attitudes which nurture lasting relationships"
                  }
                ],
                "text": "Relationship"
              },
              {
                "outline": [
                  {
                    "text": "Charity"
                  },
                  {
                    "text": "Philanthropy"
                  },
                  {
                    "text": "Vegetarianism"
                  },
                  {
                    "text": "Chastity"
                  },
                  {
                    "text": "Ahimsa"
                  },
                  {
                    "text": "Justice"
                  }
                ],
                "text": "Morality"
              },
              {
                "outline": [
                  {
                    "text": "Material world"
                  },
                  {
                    "text": "Opposite sex"
                  },
                  {
                    "text": "Attached household life"
                  },
                  {
                    "text": "Wealth or Opulences"
                  },
                  {
                    "text": "Bad association and bad habits"
                  },
                  {
                    "text": "Lust"
                  },
                  {
                    "text": "Anger"
                  },
                  {
                    "text": "Greed"
                  },
                  {
                    "text": "False Pride"
                  },
                  {
                    "text": "Envy"
                  },
                  {
                    "text": "Rajas tamas"
                  }
                ],
                "text": "Dangers of"
              },
              {
                "outline": [
                  {
                    "text": "Stress or Anxiety"
                  },
                  {
                    "text": "Quarrel and Hypocrisy or Kali"
                  },
                  {
                    "text": "Relationship"
                  },
                  {
                    "text": "Health"
                  },
                  {
                    "text": "Peace"
                  },
                  {
                    "text": "Success Formula"
                  },
                  {
                    "text": "Cycle of birth and death"
                  },
                  {
                    "text": "Progeny"
                  },
                  {
                    "text": "Prosperity"
                  }
                ],
                "text": "Vedic Solutions"
              },
              {
                "outline": [
                  {
                    "text": "Heavenly planets"
                  },
                  {
                    "text": "No happiness in material world"
                  },
                  {
                    "text": "Real happiness"
                  }
                ],
                "text": "Happiness"
              },
              {
                "outline": [
                  {
                    "text": "Rarity of human form"
                  },
                  {
                    "text": "Goal of life or Ultimate good"
                  },
                  {
                    "text": "Unfortunate situation of materialists and non-devotees"
                  },
                  {
                    "text": "Nature of women"
                  }
                ],
                "text": "Human Form"
              },
              {
                "outline": [
                  {
                    "text": "Demonstrate behaviours that inspire trust"
                  },
                  {
                    "text": "Manage time be organised and  productive"
                  },
                  {
                    "text": "Have a paradigm of interdependence"
                  },
                  {
                    "text": "Be Excellent listeners"
                  },
                  {
                    "text": "Give assertive and effective feedback"
                  },
                  {
                    "text": "Coach and counsel people at a competent level"
                  },
                  {
                    "text": "Resolve conflicts"
                  },
                  {
                    "text": "Communicate inspiring and clear outcomes and vision"
                  },
                  {
                    "text": "Create win-win agreements with others"
                  },
                  {
                    "text": "Facilitate creative thinking and problem solving with groups"
                  },
                  {
                    "text": "Co-create clear and compelling purposes -mission vision values and goals- with teams"
                  },
                  {
                    "text": "Identify position train and nourish talent"
                  },
                  {
                    "text": "Delegate and empower individuals for specific outcomes"
                  },
                  {
                    "text": "Design effective systems and strategies"
                  },
                  {
                    "text": "Apply Project Management process and tools"
                  },
                  {
                    "text": "Sharing credit of success with others and owning responsibility for setbacks"
                  },
                  {
                    "text": "Succession"
                  }
                ],
                "text": "Leadership and Management"
              },
              {
                "outline": [
                  {
                    "text": "blind leader"
                  },
                  {
                    "text": "false incarnations"
                  },
                  {
                    "text": "modern civilization remedy"
                  }
                ],
                "text": "Modern civilization"
              }
            ],
            "text": "Practical"
          }
        ],
        "text": "Tags and Sub Tags"
    }
}