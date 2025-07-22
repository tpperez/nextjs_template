export const GET_HOME_QUERY = `
{
  header {
    logo {
      alt
      url
      title
    }
    menulinks {
      id
      label
      url
    }
  }

  home {
    sectionone {
      title
      description
      items {
        id
        title
        description
        image {
          url
        }
      }
    }

    sectiontwo {
      title
      description
      image {
        url
      }
    }

    sectionthree {
      title
      description
      items {
        id
        title
        description
        image {
          url
        }
      }
    }
  }

  footer {
    copyrighttext
    footerlinks {
      id
      label
      url
    }
  }
}
`
