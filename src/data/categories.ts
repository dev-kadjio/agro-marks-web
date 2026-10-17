import type { Category } from "@/domain/category";
import { photo } from "./photos";

export const categories: readonly Category[] = [
  {
    id: "vegetables",
    slug: "legumes",
    name: { fr: "Légumes", en: "Vegetables" },
    summary: {
      fr: "Légumes-fruits, légumes feuilles et légumes des hautes terres.",
      en: "Fruiting vegetables, leafy greens and highland vegetables.",
    },
    introduction: {
      fr: "Tomates, piments, gombo, choux, carottes ou ndolé : les légumes proposés ici proviennent de maraîchers installés dans les hautes terres de l'Ouest, autour de Yaoundé ou dans l'Extrême-Nord pendant la contre-saison. Chaque fiche précise le producteur et la période de récolte indiquée par celui-ci.",
      en: "Tomatoes, chili peppers, okra, cabbage, carrots or bitter leaf: the vegetables listed here come from growers in the Western highlands, around Yaoundé or in the Far North during the off-season. Each listing names the grower and the harvest period they report.",
    },
    image: photo("tomatoes-baskets"),
  },
  {
    id: "fruits",
    slug: "fruits",
    name: { fr: "Fruits", en: "Fruit" },
    summary: {
      fr: "Ananas, papayes, avocats, mangues, safous et bananes douces.",
      en: "Pineapples, papayas, avocados, mangoes, safou and sweet bananas.",
    },
    introduction: {
      fr: "Les fruits d'AGRO-MARKS viennent de vergers et de plantations de l'Ouest, du Littoral, du Sud-Ouest et du Nord, dont des vergers d'avocatiers autour de Bafang. Leur disponibilité suit le rythme des saisons locales : certains fruits comme le safou ne sont présents que quelques mois par an.",
      en: "AGRO-MARKS fruit comes from orchards and plantations in the West, Littoral, South-West and North regions, including avocado orchards around Bafang. Availability follows local seasons: some fruit, such as safou, is only around for a few months a year.",
    },
    image: photo("mangoes"),
  },
  {
    id: "tubers-plantains",
    slug: "tubercules-et-plantains",
    name: { fr: "Tubercules et plantains", en: "Tubers and plantains" },
    summary: {
      fr: "Manioc, igname, macabo, patate douce, pomme de terre et plantain.",
      en: "Cassava, yam, cocoyam, sweet potato, potato and plantain.",
    },
    introduction: {
      fr: "Base de nombreux plats camerounais, les tubercules et les plantains sont cultivés dans presque toutes les régions. Vous trouverez ici des productions de l'Est, du Centre, de l'Ouest et du Sud-Ouest, vendues au kilo, au sac ou au régime.",
      en: "A staple of many Cameroonian dishes, tubers and plantains are grown in almost every region. Here you will find produce from the East, Centre, West and South-West, sold by the kilo, by the bag or by the bunch.",
    },
    image: photo("yams-plantains-west"),
  },
  {
    id: "cereals-legumes",
    slug: "cereales-et-legumineuses",
    name: { fr: "Céréales et légumineuses", en: "Cereals and legumes" },
    summary: {
      fr: "Maïs, riz, sorgho, arachides, haricots et niébé.",
      en: "Maize, rice, sorghum, groundnuts, beans and cowpea.",
    },
    introduction: {
      fr: "Les céréales et légumineuses de la plateforme proviennent principalement des plaines du Nord, de l'Extrême-Nord et du Nord-Ouest. Elles sont généralement séchées puis conditionnées en sacs, ce qui permet de les proposer sur une plus longue période.",
      en: "The cereals and legumes on the platform mainly come from the plains of the North, the Far North and the North-West. They are usually dried and then bagged, which means they can be offered over a longer period.",
    },
    image: photo("maize-sundrying"),
  },
  {
    id: "cocoa-coffee",
    slug: "cacao-et-cafe",
    name: { fr: "Cacao et café", en: "Cocoa and coffee" },
    summary: {
      fr: "Fèves de cacao fermentées et café arabica des hautes terres.",
      en: "Fermented cocoa beans and highland arabica coffee.",
    },
    introduction: {
      fr: "Le cacao vient des zones forestières du Centre, le café arabica des hauts plateaux de l'Ouest. Les producteurs décrivent sur leur profil la fermentation, le séchage et le tri qu'ils pratiquent.",
      en: "Cocoa comes from the forest areas of the Centre region and arabica coffee from the Western highlands. Growers describe the fermentation, drying and sorting they carry out on their profiles.",
    },
    image: photo("cocoa-beans-hands"),
  },
  {
    id: "spices-condiments",
    slug: "epices-et-condiments",
    name: { fr: "Épices et condiments", en: "Spices and condiments" },
    summary: {
      fr: "Poivre, piments séchés, gingembre et oseille de Guinée.",
      en: "Pepper, dried chili, ginger and roselle hibiscus.",
    },
    introduction: {
      fr: "Poivre cultivé dans la région de Penja, gingembre frais, piments séchés ou calices d'oseille de Guinée : ces produits sont proposés en petites quantités par des producteurs spécialisés.",
      en: "Pepper grown around Penja, fresh ginger, dried chili or roselle calyces: these products are offered in small quantities by specialist growers.",
    },
    image: photo("pepper-dried"),
  },
  {
    id: "honey",
    slug: "miel",
    name: { fr: "Miel et produits de la ruche", en: "Honey and hive products" },
    summary: {
      fr: "Miels de savane et cire d'abeille de l'Adamaoua.",
      en: "Savannah honey and beeswax from the Adamawa region.",
    },
    introduction: {
      fr: "Le miel présenté ici provient de ruchers installés sur le plateau de l'Adamaoua. La couleur et le goût varient selon les floraisons ; les apiculteurs indiquent la période de récolte de chaque lot.",
      en: "The honey listed here comes from apiaries on the Adamawa plateau. Colour and taste vary with the flowering season; beekeepers state the harvest period of each batch.",
    },
    image: photo("honey-jar"),
  },
  {
    id: "eggs-poultry",
    slug: "oeufs-et-volailles",
    name: { fr: "Œufs et volailles", en: "Eggs and poultry" },
    summary: {
      fr: "Œufs frais et poulets élevés en plein air.",
      en: "Fresh eggs and free-range chickens.",
    },
    introduction: {
      fr: "Œufs et volailles proviennent d'élevages de taille familiale situés dans le Centre. Les éleveurs détaillent sur leur profil le logement des animaux, leur alimentation et le suivi sanitaire.",
      en: "Eggs and poultry come from family-sized farms in the Centre region. Farmers describe animal housing, feed and health monitoring on their profiles.",
    },
    image: photo("eggs-basket"),
  },
];
