# AGRO-MARKS

Marketplace agricole bilingue (français / anglais) qui met en relation les consommateurs et les agriculteurs camerounais : profils d'exploitations, méthodes et étapes de production, catalogue de produits, catégories et favoris.

Cette première version est un **site public de démonstration** : les exploitations, personnes, prix, disponibilités et témoignages sont fictifs. Il n'y a ni base de données, ni authentification, ni commande, ni paiement.

## Technologies

| Domaine | Choix |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack, `cacheComponents` + Partial Prerendering, `proxy.ts`) |
| UI | React 19, Tailwind CSS 4, icônes Lucide |
| Langage | TypeScript strict (`noUncheckedIndexedAccess`) |
| Internationalisation | next-intl 4 avec `next/root-params` |
| Validation | Zod 4 (paramètres d'URL, formulaire de contact, stockage local) |
| Tests | Vitest 5, React Testing Library, jsdom |

## Prérequis

- Node.js ≥ 20.9 (développé avec Node 24)
- npm ≥ 10

## Installation et commandes

```bash
npm install
cp .env.example .env.local   # puis renseigner l'URL publique du site

npm run dev         # serveur de développement : http://localhost:3000 (redirige vers /fr)
npm run lint        # ESLint
npm run typecheck   # génération des types de routes + tsc
npm run test        # tests unitaires et de composants (Vitest)
npm run build       # build de production
npm run start       # serveur de production (après build)
npm run check       # lint + typecheck + tests + build
```

### Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique utilisée pour les canoniques, `hreflang`, Open Graph, sitemap et robots. Par défaut `http://localhost:3000`. |
| `AGRO_MARKS_WHATSAPP_NUMBER` | Numéro WhatsApp de la plateforme au format international (ex. `237XXXXXXXXX`), utilisé quand un agriculteur n'a pas de numéro. Vide : le bouton WhatsApp est désactivé avec une explication. Lu au moment du build. |

## Routes

Tous les segments sont en anglais, préfixés par la langue (`/fr` par défaut, `/en`). La racine `/` redirige vers `/fr` (détection automatique de la langue désactivée, aucun cookie posé).

| Route | Page |
| --- | --- |
| `/[locale]` | Accueil |
| `/[locale]/farmers` | Annuaire des agriculteurs (recherche, filtres, tri, pagination dans l'URL) |
| `/[locale]/farmers/[slug]` | Profil et processus de production |
| `/[locale]/products` | Catalogue (recherche, filtres, tri, pagination dans l'URL) |
| `/[locale]/products/[slug]` | Détail produit |
| `/[locale]/categories`, `/[locale]/categories/[slug]` | Catégories |
| `/[locale]/favorites` | Favoris (stockage local, `noindex`) |
| `/[locale]/about`, `contact`, `faq`, `legal`, `privacy` | Pages d'information |

## Architecture

```
messages/                 Traductions de l'interface (fr.json, en.json), par domaines fonctionnels
public/images/
  branding/               Logo officiel et variante (voir public/images/branding/README.md)
  photos/                 Photographies locales optimisées (Wikimedia Commons, licences libres)
src/
  app/
    [locale]/layout.tsx   Root layout localisé : <html lang>, providers, JSON-LD Organization/WebSite
    [locale]/(site)/      Pages publiques + layout du site (en-tête, pied de page) + 404 localisée
    global-not-found.tsx  404 bilingue pour les URL hors application
    sitemap.ts, robots.ts
  proxy.ts                Garde de routes (404 réels pour les slugs inconnus) + middleware next-intl
  domain/                 Modèles métier purs : produits, agriculteurs, catégories, régions, processus de production
  data/                   Données de démonstration centralisées (une exploitation par fichier, produits par catégorie)
  repositories/
    contracts.ts          Interfaces FarmerRepository, ProductRepository, CategoryRepository, MediaRepository, SlugIndex
    mock/                 Implémentations en mémoire alimentées par src/data
  services/               Règles métier : recherche, filtres, tri, pagination, localisation, view models
    index.ts              Racine de composition (seul endroit qui choisit l'implémentation des repositories)
  lib/                    Utilitaires : paramètres d'URL (Zod), SEO (metadata, JSON-LD, URLs), routage, dates
  i18n/                   Configuration next-intl : routing, navigation, request
  components/
    layout/ home/ farmers/ products/ filters/ favorites/ contact/ content/ errors/ seo/ ui/
tests/                    Fixtures, mocks et tests des pages dynamiques
```

Principes appliqués :

- **Server Components par défaut.** Les composants client sont limités aux interactions : filtres, carrousel, galerie, favoris, menu mobile, sélecteur de langue, formulaire.
- **Les composants de présentation ne connaissent pas les mockdata** : ils reçoivent des *view models* (`src/services/view-models.ts`) produits par les services, qui dépendent uniquement des interfaces de `repositories/contracts.ts`.
- **Filtres côté serveur** : les pages de liste lisent les `searchParams` validés par Zod dans une frontière `<Suspense>` (PPR). Le contenu reste rendu côté serveur et indexable ; le panneau de filtres met à jour l'URL (résultats partageables, retour navigateur fonctionnel) et fonctionne aussi sans JavaScript (formulaire `GET`).
- **Unions discriminées** pour la disponibilité d'un produit (`in-stock`, `limited`, `pre-order`, `out-of-season`) et pour le processus de production (`crop`, `livestock`, `beekeeping`), afin que chaque exploitation n'affiche que les étapes pertinentes.
- **Favoris** : store `localStorage` validé par Zod, exposé via `useSyncExternalStore` avec un instantané serveur vide (pas d'erreur d'hydratation), synchronisé entre onglets.

## Internationalisation

- Textes d'interface : `messages/fr.json` et `messages/en.json`, typés via `src/global.d.ts` (une clé absente fait échouer `tsc`).
- Contenus métier : champs `LocalizedText` (`{ fr, en? }`) dans `src/data`, résolus par `localize()` avec repli contrôlé sur le français.
- Le sélecteur de langue conserve la page, le slug et les paramètres de filtre.
- Nombres, prix (devise des données, FCFA) et mois sont formatés selon la langue active.
- Les tests vérifient la parité des clés, la cohérence des variables ICU et la présence de toutes les traductions dans les données.

## SEO

- Métadonnées traduites par page (API Metadata), canonique et `hreflang` fr/en/x-default, Open Graph et Twitter.
- Les combinaisons de filtres pointent leur canonique vers la page sans paramètres.
- JSON-LD : `Organization`, `WebSite` (avec `SearchAction`), `BreadcrumbList`, `Product` (sans prix ni avis, les prix étant fictifs) et `Person` pour les profils.
- `sitemap.xml` généré depuis les services, avec alternates linguistiques ; `robots.txt`.
- Images via `next/image` avec dimensions connues.

## Données de démonstration

| Fichier | Contenu |
| --- | --- |
| `src/data/farmers/*.ts` | 14 exploitations fictives dans 9 régions, avec leur processus de production |
| `src/data/products/*.ts` | 51 produits répartis par catégorie |
| `src/data/categories.ts` | 8 catégories |
| `src/data/photos.ts` | Catalogue des photos (dimensions, textes alternatifs bilingues, crédits et licences) |
| `src/data/editorial.ts` | Photos des emplacements éditoriaux (accueil, à propos) |

Les libellés de régions, spécialités, pratiques agricoles et unités de vente sont des énumérations du domaine (`src/domain`) traduites dans `messages/*.json`.

### Ajouter un agriculteur

1. Créer `src/data/farmers/<slug>.ts` en exportant un objet `Farmer` (identifiant `farmer-XX` unique, slug en minuscules avec tirets, textes `fr` et `en`).
2. Choisir le `production.type` adapté (`crop`, `livestock` ou `beekeeping`) ; les étapes optionnelles (`irrigation`, `cropProtection`) peuvent être omises.
3. L'ajouter au tableau de `src/data/farmers/index.ts`.
4. Lui associer au moins un produit (vérifié par les tests).

### Ajouter un produit

1. Ajouter un objet `Product` dans le fichier de sa catégorie sous `src/data/products/` (identifiant `product-XXX` unique, `farmerId` existant, prix en XAF, unité parmi `saleUnits`).
2. Pour une nouvelle photo : déposer le fichier dans `public/images/photos/`, l'ajouter à `src/data/photos.ts` avec dimensions, textes alternatifs et licence.
3. Lancer `npm run test` : les tests d'intégrité contrôlent les références, les slugs, les traductions et l'existence des images.

## Contact WhatsApp

Les fiches produit et les profils d'agriculteurs proposent un bouton « Discuter sur WhatsApp » qui ouvre `https://wa.me/<numéro>` avec un message prérempli et traduit (produit, prix, unité, lien vers la page).

- Si l'agriculteur a un `whatsappNumber` (champ optionnel de `Farmer`), le message lui est adressé directement.
- Sinon, il est adressé au numéro de la plateforme (`AGRO_MARKS_WHATSAPP_NUMBER`), et l'interface indique que l'équipe AGRO-MARKS assure la mise en relation.
- Sans aucun numéro, le bouton est désactivé avec une explication.

Les données de démonstration ne contiennent volontairement aucun numéro : les agriculteurs étant fictifs, un numéro inventé pourrait appartenir à une personne réelle. Ajouter `whatsappNumber: "+237…"` dans `src/data/farmers/<slug>.ts` uniquement avec l'accord du producteur.

## Remplacer les repositories mockés

1. Implémenter les interfaces de `src/repositories/contracts.ts` (par exemple `src/repositories/api/` ou `src/repositories/database/`), en retournant les mêmes modèles du domaine. Utiliser `"use cache"` / `cacheLife` sur les lectures si nécessaire.
2. Modifier uniquement la racine de composition `src/services/index.ts` pour instancier ces repositories.
3. Remplacer `createMockSlugIndex()` dans `src/proxy.ts` par un index de slugs rapide (liste mise en cache, endpoint dédié) ou retirer ce garde : les pages appellent déjà `notFound()` pour un slug inconnu.

Les routes, les composants de présentation, les view models et les services n'ont pas à changer.

## À configurer avant une mise en production

- `NEXT_PUBLIC_SITE_URL` avec le domaine réel.
- Mentions légales et politique de confidentialité : compléter les champs entre crochets dans `messages/*.json` (`legal`, `privacy`).
- `AGRO_MARKS_WHATSAPP_NUMBER` et, avec leur accord, les numéros WhatsApp des producteurs.
- Coordonnées de contact et backend d'envoi du formulaire (aucun envoi n'est effectué aujourd'hui, ce qui est indiqué à l'utilisateur).
- Remplacer les données fictives par des données vérifiées ; ne présenter une certification qu'avec justificatif.

## Crédits photographiques

Les photographies proviennent de Wikimedia Commons sous licences libres (CC0, domaine public, CC BY, CC BY-SA). Auteurs, licences et sources sont listés sur la page Mentions légales et dans `src/data/photos.ts`.

## Limites connues

- Avec `cacheComponents`, la page 404 localisée prérendue est livrée avec le bon statut HTTP 404 et `noindex`, mais son contenu est affiché par la reprise côté client (le HTML initial est une coquille). Le rendu reste correct dans le navigateur.
# agro-marks-web
