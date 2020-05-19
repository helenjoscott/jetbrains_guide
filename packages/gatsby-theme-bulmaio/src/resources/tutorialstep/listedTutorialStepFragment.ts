import { graphql } from 'gatsby';

export const query = graphql`
  fragment ListedTutorialStepFragment on TutorialStep {
    slug
    title
    subtitle
    slug
    date(formatString: "MMMM Do, YYYY")
    thumbnail {
      ...ThumbnailFragment
    }
    cardThumbnail {
      ...ThumbnailFragment
    }
    author {
      ...ListedAuthorFragment
    }
    products {
      ...ListedProductFragment
    }
    technologies {
      ...ListedTechnologyFragment
    }
    topics {
      ...ListedTopicFragment
    }    
  }
`;