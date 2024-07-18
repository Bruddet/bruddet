import {StructureBuilder} from 'sanity/structure'
import {CalendarIcon, DocumentTextIcon, HomeIcon, UserIcon, InfoOutlineIcon} from '@sanity/icons'

const SINGLETONS = [
  {id: 'frontpage', title: 'Forside', _type: 'frontpage', icon: HomeIcon, schemaType: 'frontpage'},
  {
    id: 'infopage',
    title: 'Informasjonsside',
    _type: 'document',
    icon: InfoOutlineIcon,
    schemaType: 'infopage',
  },
]

const MULTI = [
  {
    id: 'article',
    title: 'Artikler',
    _type: 'document',
    icon: DocumentTextIcon,
    schemaType: 'article',
  },
  {
    id: 'event',
    title: 'Forestillinger',
    _type: 'document',
    icon: CalendarIcon,
    schemaType: 'event',
  },
  {
    id: 'role',
    title: 'Roller',
    _type: 'document',
    icon: UserIcon,
    schemaType: 'role',
  },
]

const LANGUAGES = [
  {id: `nb`, title: `🇳🇴 Norwegian (Bokmål)`},
  {id: `en`, title: `🇬🇧 English`},
]

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Innhold')
    .items([
      ...SINGLETONS.map((singleton) =>
        S.listItem()
          .title(singleton.title)
          .id(singleton.id)
          .icon(singleton.icon)
          .child(
            S.list()
              .title(singleton.title)
              .id(singleton.id)

              .items(
                LANGUAGES.map((language) =>
                  S.documentListItem()
                    .schemaType(singleton.schemaType)
                    .id(`${singleton.id}-${language.id}`)
                    .title(`${singleton.title} (${language.id.toLocaleUpperCase()})`),
                ),
              )
              .canHandleIntent(
                (intentName, params) => intentName === 'edit' && params.id.startsWith(singleton.id),
              ),
          ),
      ),
      S.divider(),
      ...MULTI.map((multi) =>
        S.listItem()
          .title(multi.title)
          .id(multi.id)
          .icon(multi.icon)
          .child(
            S.list()
              .title(multi.title)
              .id(multi.id)
              .items([
                ...LANGUAGES.map((language) =>
                  S.listItem()
                    .title(`${multi.title} (${language.id.toLocaleUpperCase()})`)
                    .icon(multi.icon)
                    .child(
                      S.documentList()
                        .title(`${language.id.toLocaleUpperCase()}`)
                        .filter(`_type=="${multi.id}" && language=="${language.id}"`),
                    ),
                ),
              ]),
          ),
      ),
    ])
