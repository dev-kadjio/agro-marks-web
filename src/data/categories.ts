import type { Category } from "@/domain/category";
import { text } from "./helpers";
import { photo } from "./photos";

export const categories: readonly Category[] = [
  {
    id: "vegetables",
    slug: "vegetables",
    producerType: "farmer",
    name: text("Maraîchage et légumes", "Market gardening and vegetables"),
    summary: text(
      "Légumes-fruits, légumes feuilles et légumes des hautes terres.",
      "Fruiting vegetables, leafy greens and highland vegetables.",
    ),
    introduction: text(
      "Tomates, piments, gombo, choux, carottes ou ndolé : les maraîchers présentés ici travaillent dans les hautes terres de l'Ouest, autour de Yaoundé ou dans l'Extrême-Nord pendant la contre-saison. Leurs profils détaillent la pépinière, l'irrigation et la protection des cultures.",
      "Tomatoes, chili peppers, okra, cabbage, carrots or bitter leaf: the market gardeners featured here work in the Western highlands, around Yaoundé or in the Far North during the off-season. Their profiles explain their nurseries, irrigation and crop protection.",
    ),
    image: photo("tomatoes-baskets"),
  },
  {
    id: "fruits",
    slug: "fruits",
    producerType: "farmer",
    name: text("Fruits et vergers", "Fruit and orchards"),
    summary: text(
      "Ananas, papayes, avocats, mangues, safous et bananes douces.",
      "Pineapples, papayas, avocados, mangoes, safou and sweet bananas.",
    ),
    introduction: text(
      "Vergers d'avocatiers autour de Bafang, plantations d'ananas du Moungo ou fruitiers du Sud-Ouest : ces arboriculteurs expliquent la conduite de leurs arbres et le rythme des récoltes, qui suit les saisons locales.",
      "Avocado orchards around Bafang, pineapple plantations in the Moungo or fruit trees in the South-West: these growers explain how they tend their trees and how harvests follow the local seasons.",
    ),
    image: photo("mangoes"),
  },
  {
    id: "food-crops",
    slug: "food-crops",
    producerType: "farmer",
    name: text("Cultures vivrières", "Food crops"),
    summary: text(
      "Manioc, igname, macabo, patate douce, pomme de terre et plantain.",
      "Cassava, yam, cocoyam, sweet potato, potato and plantain.",
    ),
    introduction: text(
      "Base de nombreux plats camerounais, les tubercules et les plantains sont cultivés dans presque toutes les régions. Les producteurs de l'Est, du Centre, de l'Ouest et du Sud-Ouest décrivent ici leurs associations de cultures et leurs jachères.",
      "A staple of many Cameroonian dishes, tubers and plantains are grown in almost every region. Growers from the East, Centre, West and South-West describe their intercropping and fallow practices here.",
    ),
    image: photo("yams-plantains-west"),
  },
  {
    id: "cereals-legumes",
    slug: "cereals-legumes",
    producerType: "farmer",
    name: text("Céréales et légumineuses", "Cereals and legumes"),
    summary: text("Maïs, riz, sorgho, arachides, haricots et niébé.", "Maize, rice, sorghum, groundnuts, beans and cowpea."),
    introduction: text(
      "Les céréales et légumineuses présentées ici proviennent surtout des plaines du Nord, de l'Extrême-Nord et du Nord-Ouest. Les producteurs y détaillent le semis, le séchage et le stockage des grains.",
      "The cereals and legumes featured here mainly come from the plains of the North, the Far North and the North-West. Growers explain how they sow, dry and store their grain.",
    ),
    image: photo("maize-sundrying"),
  },
  {
    id: "cash-crops",
    slug: "cash-crops",
    producerType: "farmer",
    name: text("Cultures de rente", "Cash crops"),
    summary: text("Cacao des zones forestières et café arabica des hautes terres.", "Forest-zone cocoa and highland arabica coffee."),
    introduction: text(
      "Le cacao vient des zones forestières du Centre, le café arabica des hauts plateaux de l'Ouest. Les producteurs décrivent sur leur profil l'ombrage, la fermentation, le séchage et le tri qu'ils pratiquent.",
      "Cocoa comes from the forest areas of the Centre region and arabica coffee from the Western highlands. Growers describe the shade cover, fermentation, drying and sorting they practise on their profiles.",
    ),
    image: photo("cocoa-beans-hands"),
  },
  {
    id: "spices-condiments",
    slug: "spices-condiments",
    producerType: "farmer",
    name: text("Épices et condiments", "Spices and condiments"),
    summary: text("Poivre, piments, gingembre et oseille de Guinée.", "Pepper, chili, ginger and roselle hibiscus."),
    introduction: text(
      "Poivre cultivé dans la région de Penja, gingembre, piments ou calices d'oseille de Guinée : ces productions demandent un savoir-faire particulier, notamment pour le séchage.",
      "Pepper grown around Penja, ginger, chili or roselle calyces: these crops call for particular know-how, especially when it comes to drying.",
    ),
    image: photo("pepper-dried"),
  },
  {
    id: "poultry-farming",
    slug: "poultry-farming",
    producerType: "breeder",
    name: text("Élevage de volailles", "Poultry farming"),
    summary: text("Poules pondeuses, poulets de chair et canards.", "Laying hens, broiler chickens and ducks."),
    introduction: text(
      "Des élevages familiaux du Centre aux bâtiments avicoles du Littoral, en passant par les canards élevés près de la Sanaga, les aviculteurs présentent ici le logement des oiseaux, leur alimentation, le suivi sanitaire et la gestion de la litière.",
      "From family farms in the Centre to poultry houses in the Littoral and ducks raised near the Sanaga, these poultry farmers present how they house, feed and look after their birds, and how they manage litter.",
    ),
    image: photo("poultry-farm-moungo"),
  },
  {
    id: "cattle-farming",
    slug: "cattle-farming",
    producerType: "breeder",
    name: text("Élevage de bovins", "Cattle farming"),
    summary: text("Zébus de l'Adamaoua et vaches laitières des hautes terres.", "Adamawa zebu and highland dairy cows."),
    introduction: text(
      "Pâturage tournant sur les plateaux de l'Adamaoua ou étable laitière dans le Nord-Ouest : les éleveurs de bovins expliquent la conduite du troupeau, les fourrages, la reproduction et la traite.",
      "Rotational grazing on the Adamawa plateaus or a dairy shed in the North-West: cattle farmers explain how they manage their herds, fodder, breeding and milking.",
    ),
    image: photo("zebu-head-cameroon"),
  },
  {
    id: "pig-farming",
    slug: "pig-farming",
    producerType: "breeder",
    name: text("Élevage de porcs", "Pig farming"),
    summary: text("Élevages naisseurs-engraisseurs de l'Ouest.", "Farrow-to-finish pig farms in the West."),
    introduction: text(
      "Les éleveurs de porcs décrivent l'hygiène des loges, la fabrication de la provende, les mises bas et l'engraissement, ainsi que la valorisation du fumier sur les parcelles voisines.",
      "Pig farmers describe pen hygiene, how they mix feed, farrowing and finishing, and how manure is used on neighbouring plots.",
    ),
    image: photo("pig-husbandry"),
  },
  {
    id: "goat-sheep-farming",
    slug: "goat-sheep-farming",
    producerType: "breeder",
    name: text("Élevage de chèvres et de moutons", "Goat and sheep farming"),
    summary: text("Moutons peuls et chèvres locales du Nord.", "Fulani sheep and local goats from the North."),
    introduction: text(
      "Dans le Nord du pays, les petits ruminants sont conduits au pâturage le matin et nourris de fanes de légumineuses en saison sèche. Les éleveurs expliquent comment ils traversent les saisons et préparent les fêtes.",
      "In the north of the country, goats and sheep are taken to graze in the morning and fed legume haulms in the dry season. Farmers explain how they get through the seasons and prepare for festivities.",
    ),
    image: photo("goats-cameroon-voa"),
  },
  {
    id: "fish-farming",
    slug: "fish-farming",
    producerType: "breeder",
    name: text("Pisciculture", "Fish farming"),
    summary: text("Tilapias et silures élevés en étangs et en bacs.", "Tilapia and catfish raised in ponds and tanks."),
    introduction: text(
      "Les pisciculteurs présentent la préparation des étangs, l'empoissonnement, le nourrissage, le suivi de la qualité de l'eau et la pêche, jusqu'au fumage du poisson.",
      "Fish farmers present how they prepare ponds, stock fingerlings, feed the fish, monitor water quality and harvest, through to smoking the fish.",
    ),
    image: photo("fish-ponds"),
  },
  {
    id: "beekeeping",
    slug: "beekeeping",
    producerType: "breeder",
    name: text("Apiculture", "Beekeeping"),
    summary: text("Miels de savane et cire d'abeille de l'Adamaoua.", "Savannah honey and beeswax from the Adamawa region."),
    introduction: text(
      "Les ruchers présentés ici sont installés sur le plateau de l'Adamaoua. Les apiculteurs y expliquent le suivi des colonies et la récolte des rayons, dont la couleur et le goût varient selon les floraisons.",
      "The apiaries featured here are on the Adamawa plateau. Beekeepers explain how they look after their colonies and harvest combs, whose colour and taste vary with the flowering season.",
    ),
    image: photo("honeycomb-frame"),
  },
];
