## 8. Catalogue produits

### 8.1 Taxonomie

Le catalogue du MVP est volontairement court pour valider les ventes avant d'élargir l'offre. Le site doit proposer quatre catégories : abonnements et licences (Premium, licence Club, module Squadly AI), textiles (maillots, survêtements), accessoires d'entraînement et packs club, en cohérence avec le modèle freemium du PDF source. Le volume de lancement est fixé à quinze à trente références hors variantes, cible indicative à valider par le sponsor. L'extension par sport et les filtres associés sont reportés en phase 2.

### 8.2 Modèle de données produit

Le site doit reposer sur un modèle de données unique, alimenté par le backend, jamais codé en dur dans les pages. Les attributs obligatoires sont définis ci-dessous.

| Attribut | Règle métier | Erreur à traiter |
|---|---|---|
| Titre et description | Orientée usage sportif, ton Squadly | Publication sans description refusée |
| Catégorie | Une parmi les quatre du MVP | Catégorie vide masquée du menu |
| Variantes | Taille et couleur, stock propre à chaque variante | Combinaison indisponible signalée |
| SKU | Identifiant unique par variante, pour stocks et factures | Doublon bloqué à la saisie |
| Prix HT/TTC et TVA | Affichage TTC, TVA calculée côté serveur | Recalcul systématique avant paiement |
| Stock | Décrémenté à la commande confirmée, seuil d'alerte | Rupture avant paiement : message clair |
| Images | Formats modernes, alternative textuelle | Aucune publication sans image |
| Statut | Brouillon, publié, archivé | Archivé retiré du catalogue et du sitemap |
| Personnalisation | Nom, numéro, logo club en fichier | Fichier invalide rejeté avec message explicite |

Les produits numériques (abonnements, licences) sont traités à part : pas de stock ni de livraison, association à un plan Stripe Billing, activation des droits uniquement après paiement confirmé par webhook. Un abonnement ne doit jamais passer par le tunnel de livraison.

### 8.3 Fiches produits

Chaque fiche produit doit contenir : visuels optimisés, prix TTC, disponibilité en temps réel, guide des tailles pour les textiles, délais et modes de livraison, conditions de retour, mentions légales de personnalisation le cas échéant. Ces mentions légales doivent préciser que les produits personnalisés (nom, numéro, logo club) sont exclus du droit de rétractation de quatorze jours, conformément à l'exception prévue pour les biens confectionnés selon les spécifications du consommateur, et que le fichier fourni engage la responsabilité du client sur les droits d'usage du logo. Règle de qualité : aucune fiche publiée sans image, sans stock renseigné ni sans relecture. Critère d'acceptation : une fiche textile permet de choisir une taille, de vérifier la disponibilité et d'ajouter au panier en moins de trois interactions sur mobile.

Sources du chapitre : « /mnt/agents/temp/Cahier_des_charges_Squadly.pdf » (modèle freemium, offres), « /mnt/agents/output/research/squadly_ecommerce_dim01_analyse_pdf.md » ; volume de catalogue et mentions légales de personnalisation : décision projet à valider.

## 9. Paiements et facturation

### 9.1 Prestataire et intégration

Le prestataire retenu est Stripe Checkout hébergé, recommandation issue de la recherche technique pour trois raisons : aucune donnée carte ne transite par nos serveurs, ce qui minimise le périmètre PCI ; l'authentification forte 3DS/SCA est gérée nativement ; l'intégration est rapide pour une petite équipe. Le site doit accepter les cartes bancaires au lancement ; Apple Pay et Google Pay seront activés via Stripe dès que disponibles. Le virement ou paiement différé est réservé au parcours club et reste à arbitrer.

### 9.2 Webhooks et fiabilité

La création de commande repose exclusivement sur l'événement « checkout.session.completed », traité de façon idempotente : un événement reçu deux fois ne crée jamais deux commandes. Le site doit journaliser chaque événement, permettre son rejeu et maintenir une file des événements en échec avec alerte. L'équipe devra réconcilier chaque jour Stripe et la base de commandes ; le taux de succès des paiements doit être supérieur à 95 %, exigence ferme cohérente avec le chapitre 2. Critère d'acceptation : fermer le navigateur après paiement ne produit jamais un paiement sans commande.

### 9.3 Cas financiers particuliers

Le back-office doit permettre le remboursement total ou partiel, avec émission d'un avoir, mise à jour du statut et email systématique au client. La TVA française s'applique au MVP ; chaque commande génère une facture au format PDF, numérotée de façon séquentielle et inaltérable, téléchargeable depuis l'espace client et renvoyée en pièce jointe de l'email de confirmation, avec les mentions obligatoires, et un export comptable mensuel est produit. Le régime OSS (guichet unique de TVA européenne) sera étudié dès la première vente hors France ; le multi-pays reste hors MVP.

Sources du chapitre : « /mnt/agents/output/research/squadly_ecommerce_dim02_workflows_stack.md » (intégration Stripe, webhooks), https://docs.stripe.com/checkout ; régime TVA/OSS : décision projet à valider si nécessaire.

## 10. Abonnements et licences

### 10.1 Offres

La boutique vend trois offres numériques, cohérentes avec le modèle freemium du PDF : la version gratuite reste dans l'application, la boutique vend les niveaux payants. Tous les prix sont des cibles à valider par le sponsor.

| Offre | Cible | Contenu | Facturation |
|---|---|---|---|
| Premium individuel | Coachs, joueurs, parents | Fonctions avancées et module Squadly AI | Mensuelle ou annuelle, Stripe Billing |
| Licence Club | Clubs | Plusieurs équipes, tarif dégressif par volume | Annuelle, devis possible |
| Module Squadly AI | Abonnés gratuits ou Premium | Entraînements, compositions, résumés assistés | Option mensuelle |

### 10.2 Mécanique d'abonnement

Le cycle de vie repose sur Stripe Billing : création après paiement, renouvellement automatique, relances en cas d'échec de prélèvement, prorata lors d'un changement d'offre, résiliation en fin de période en libre-service. Les droits sont activés uniquement sur confirmation webhook, jamais sur la redirection post-paiement. Le portage vers l'application Squadly se fait au MVP par liaison de compte email ; le SSO complet relève de la phase 3. Critère d'acceptation : un utilisateur qui résilie conserve ses droits jusqu'en fin de période et reçoit un email de confirmation.

Sources du chapitre : « /mnt/agents/temp/Cahier_des_charges_Squadly.pdf » (modèle économique freemium, offre spéciale clubs), « /mnt/agents/output/research/squadly_ecommerce_dim02_workflows_stack.md » (Stripe Billing) ; grille des offres et prix : décision projet à valider.

## 11. Comptes clients et espaces club

### 11.1 Authentification

La solution retenue côté storefront est Auth.js ou Better Auth : email et mot de passe, lien magique en option, réinitialisation sécurisée ; Clerk reste l'alternative si l'équipe préfère un service géré. Le site doit imposer une politique de mot de passe raisonnable, une protection contre le bourrage d'identifiants, des sessions révocables et une authentification multifacteur obligatoire pour les comptes d'administration. Le paiement en invité reste possible ; la création de compte est proposée après l'achat, jamais imposée avant.

### 11.2 Espace client

L'espace client doit comporter cinq sections : commandes et statuts, abonnements et licences actifs, factures téléchargeables, adresses, données personnelles avec export et suppression conformes au RGPD. Le lien avec l'application se limite au MVP à un lien « ouvrir Squadly » et à l'affichage des avantages Premium actifs ; la synchronisation complète des comptes relève de la phase 3.

### 11.3 Espace club

L'espace club s'adresse au trésorier ou responsable identifié dans les personas. Il doit offrir : gestion de plusieurs équipes, membres autorisés à commander, historique des commandes groupées, dépôt et suivi des demandes de devis, codes promo dédiés. Au MVP, la personnalisation passe par un formulaire structuré (nom, numéro, logo en fichier) traitée manuellement ; le configurateur en ligne est phase 2. Critère d'acceptation : un responsable club suit l'état de sa demande de devis sans contacter le support.

Sources du chapitre : « /mnt/agents/output/research/squadly_ecommerce_dim02_workflows_stack.md » (choix d'authentification) ; contenu des espaces client et club : décision projet.

## 12. Back-office et opérations

### 12.1 Fonctions du back-office

Le back-office du MVP doit couvrir cinq modules : produits et stocks, commandes (statuts, expédition, remboursement), consultation des clients, codes promo simples, tableau de bord des ventes. Trois rôles sont exigés, chaque action sensible étant tracée avec auteur et date.

| Rôle | Droits | Interdictions |
|---|---|---|
| Administrateur | Tous droits, gestion des comptes et rôles | Aucune, sous MFA obligatoire |
| Gestionnaire boutique | Produits, stocks, commandes, remboursements, promos | Gestion des utilisateurs, accès aux clés |
| Support lecture seule | Consultation commandes et clients, réponse aux demandes | Modification, remboursement, export de masse |

### 12.2 Opérations quotidiennes

L'équipe devra tenir une routine écrite : chaque jour, expédier les commandes, vérifier les webhooks en échec, mettre à jour les stocks, répondre aux demandes de retour sous un délai à fixer (cible indicative à valider) ; en fin de mois, produire l'export comptable. Le back-office doit donner accès aux logs, au monitoring Sentry, au statut des sauvegardes et aux files d'événements, avec une procédure pour chaque incident courant (webhook perdu, paiement sans commande, stock incohérent).

Sources du chapitre : « /mnt/agents/output/research/squadly_ecommerce_dim02_workflows_stack.md » (opérations et monitoring) ; rôles, routines et délais de traitement : décision projet à valider.

## 13. Design system Squadly

### 13.1 Principes d'identité

Le design doit traduire l'identité du PDF : moderne, sportive, jeune, professionnelle et premium, avec une interface simple et rapide, pensée d'abord pour le téléphone. Un logo symbole évoquant équipe, mouvement et coordination sera produit et décliné en favicon, avatar social et en-tête d'emails. Règle non négociable : le style sportif ne doit jamais réduire contrastes, lisibilité ni navigation clavier ; l'accessibilité WCAG 2.2 AA prime sur l'effet visuel.

### 13.2 Fondations du design system

Les tokens Squadly seront définis en variables CSS Tailwind v4 : couleurs de marque et sémantiques, échelle typographique, espacements, rayons et ombres ; thème clair par défaut, thème sombre seulement si validé. Point de vigilance : la section Design du PDF source contient des puces corrompues et la charte détaillée est absente. Les tokens sont donc une proposition à valider par le sponsor avant tout développement des gabarits, avec un jalon dédié au planning.

### 13.3 Composants et patterns

La fondation retenue est shadcn/ui (Radix + Tailwind, code possédé, licence MIT), avec les icônes Lucide, des animations sobres via Motion et des notifications Sonner ; aucune dépendance UI opaque n'est admise. Les patterns prescrits sont mobile-first : navigation basse sur mobile, panier en drawer plein écran, boutons d'action larges, formulaires courts, micro-interactions discrètes, avec le template Striker comme benchmark visuel sportif.

Sources du chapitre : « /mnt/agents/temp/Cahier_des_charges_Squadly.pdf » (identité de marque, section Design corrompue), « /mnt/agents/output/research/squadly_ecommerce_dim03_templates.md », https://ui.shadcn.com ; tokens Squadly : décision projet à valider par le sponsor.

## 14. Templates et structure des pages

### 14.1 Arborescence du site

Le site doit couvrir : accueil (proposition de valeur, nouveautés, packs club, offre Premium), boutique par catégorie, fiche produit, page club B2B, panier et tunnel de paiement, compte client, support avec FAQ, pages légales. Chaque page définit ses blocs, ses données sources et son état vide : une catégorie sans produit affiche un message et un renvoi, jamais une page blanche ; un compte sans commande invite à découvrir la boutique.

La matrice page-gabarit ci-dessous fixe la correspondance entre chaque page et son gabarit technique. L'équipe devra la tenir à jour dans le dépôt ; toute nouvelle page exige une ligne validée en revue.

| Page | Gabarit utilisé | Blocs de contenu | Données sources | Exigence SEO associée | État vide prévu |
|---|---|---|---|---|---|
| Accueil | Gabarit éditorial (sections composables) | Proposition de valeur, nouveautés, packs club, offre Premium | Catalogue backend, contenu éditorial | Titre et métadonnées uniques, balisage Organization | Section sans contenu masquée, jamais de trou dans la page |
| Boutique par catégorie | Gabarit listing produits (rendu serveur, ISR) | Titre de catégorie, texte éditorial, grille produits, filtres taille/couleur | Catégories et produits publiés du backend | URLs lisibles, canonical, texte éditorial unique par catégorie | Message explicite et renvoi vers les autres catégories |
| Fiche produit | Gabarit produit avec variantes | Galerie, prix TTC, sélecteur de variante, disponibilité, guide des tailles, livraison et retours | Produit, variantes, stocks et images du backend | JSON-LD Product et Offer, BreadcrumbList, métadonnées uniques | Produit archivé ou épuisé : message et suggestion d'alternatives |
| Page club B2B | Gabarit page argumentaire avec formulaire | Argumentaire commande groupée, offre licence Club, formulaire de devis | Contenu éditorial, offres numériques du backend | Page ciblée « maillot personnalisé club », données structurées Service | Formulaire toujours disponible ; erreur d'envoi avec sauvegarde de la saisie |
| Panier et tunnel | Gabarit transactionnel (panier en drawer, redirection Stripe Checkout) | Récapitulatif panier, codes promo, redirection paiement hébergé, confirmation | Panier recalculé côté serveur, session Stripe | Balise noindex sur panier et tunnel | Panier vide : message et renvoi vers la boutique |
| Compte client | Gabarit espace authentifié à sections | Commandes, abonnements, factures téléchargeables, adresses, données personnelles | Compte, commandes et abonnements du backend | noindex, aucune donnée personnelle indexable | Compte sans commande : invitation à découvrir la boutique |
| Support et FAQ | Gabarit contenu éditorial | Questions-réponses achat, retours, tailles, contact | Contenu éditorial | Données structurées FAQPage si admissibles | Aucune réponse trouvée : renvoi vers le formulaire de contact |
| Pages légales | Gabarit contenu statique | Mentions légales, CGV, CGU abonnements, politique de confidentialité, déclaration d'accessibilité | Corpus juridique rédigé avant lancement | Indexables, accessibles en pied de page de tout le site | Jamais vide : publication bloquante pour la mise en production |

### 14.2 Templates de départ

La sélection des templates est une recommandation issue de la recherche comparative, soumise aux conditions suivantes.

| Template | Rôle | Licence | Conditions d'adoption |
|---|---|---|---|
| Medusa DTC Starter | Base monorepo backend + storefront | MIT | Rebranding complet aux tokens Squadly, suppression du code inutilisé |
| Next.js Commerce | Référence de patterns App Router | MIT | Emprunt de patterns uniquement, pas de dépendance au provider Shopify |
| shadcnblocks / Tailwind Plus | Accélérateurs de blocs e-commerce | Freemium / payante | Achat décidé par le sponsor, revue d'accessibilité de chaque bloc importé |

L'équipe devra vérifier la licence avant tout import et documenter la provenance de chaque bloc dans le dépôt.

### 14.3 Gabarits transactionnels

Les emails transactionnels seront produits avec React Email et envoyés via Resend. Le MVP exige six gabarits : confirmation de commande, expédition, remboursement, confirmation d'abonnement, échec de prélèvement, réinitialisation de mot de passe. Chaque gabarit doit exister en HTML et en texte, reprendre les tokens de marque et rester lisible sans image. Critère d'acceptation : chaque gabarit est testé en envoi réel sur les messageries courantes, avec une délivrabilité qui doit être supérieure à 98 %, exigence ferme.

Sources du chapitre : « /mnt/agents/output/research/squadly_ecommerce_dim03_templates.md » (sélection des templates), https://github.com/medusajs/dtc-starter, https://github.com/vercel/commerce, https://react.email, https://resend.com/docs ; matrice page-gabarit et conditions d'adoption : décision projet.
