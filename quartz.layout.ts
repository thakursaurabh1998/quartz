import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

const staticPages = new Set(["about", "now"])

const recentNotes = [
  Component.RecentNotes({
    title: String(),
    filter: (f) =>
      staticPages.has(f.slug!) && !f.frontmatter?.noindex,
    sort: (a, b) => a.slug! > b.slug! ? 1 : -1,
    showTags: false,
  }),
  Component.RecentNotes({
    title: "Recent Articles",
    limit: 3,
    filter: (f) =>
      f.slug!.startsWith("posts/") && f.slug! !== "posts/index" && !f.frontmatter?.noindex,
    linkToMore: "posts/" as SimpleSlug,
    showTags: false,
  }),
  Component.RecentNotes({
    title: "Recent Notes",
    limit: 3,
    filter: (f) =>
      f.slug!.startsWith("thoughts/") && f.slug! !== "thoughts/index" && !f.frontmatter?.noindex,
    linkToMore: "thoughts/" as SimpleSlug,
    showTags: false,
  }),
]

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [...recentNotes.map((c) => Component.MobileOnly(c))],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/thakursaurabh1998",
      Twitter: "https://twitter.com/thakursaurabh1998",
      Imprints: "https://imprints.saurabhthakur.dev",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left: [
    Component.PageTitle(),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.DesktopOnly(Component.ReaderMode()) },
      ],
    }),
    ...recentNotes.map((c) => Component.DesktopOnly(c)),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.Graph(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
