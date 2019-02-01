import { graphql } from 'gatsby';
import React from 'react';
import { Element } from 'react-scroll/modules';
import BottomNav from './BottomNav';
import TopNav from './TopNav';
import TutorialStepWrapper from './TutorialStepWrapper';
import VideoPlayer from '../../components/VideoPlayer';

import Sidebar from '../../components/sidebar/Sidebar';
import SidebarLayout from '../../layouts/SidebarLayout';
import SidebarPublished from '../../components/sidebar/SidebarPublished';
import SidebarReferenceGroup from '../../components/sidebar/SidebarReferencesGroup';
import SidebarSteps from '../../components/sidebar/SidebarSteps';
import { getPrevNextBySlug } from './utils';

interface ITutorialStepProps {
  resource: any;
  tutorial: any;
}

const TutorialStep: React.FunctionComponent<ITutorialStepProps> = ({ resource: tutorialstep, tutorial }) => {
  // Up, Previous, Next
  const navUp = { label: tutorial.title, slug: tutorial.slug };
  const prevNext = getPrevNextBySlug(
    tutorial.steps.map((step: any) => {
      return { label: step.label, slug: step.slug };
    }),
    tutorialstep.slug
  );

  const navPrevious = prevNext.previous;
  const navNext = prevNext.next;
  const topNav = <TopNav up={navUp} previous={navPrevious} next={navNext} />;
  const bottomNav = <BottomNav previous={navPrevious} next={navNext} />;

  // Video
  const longVideo = tutorialstep.longVideo;
  const longVideoJsOptions = longVideo
    ? {
        controls: true,
        poster: longVideo.poster.publicURL,
        fluid: true,
        // height: 720,
        // width: 1024,
        techOrder: ['youtube'],
        sources: [
          {
            src: longVideo.url,
            type: 'video/youtube'
          }
        ]
      }
    : null;

  const sidebar = (
    <Sidebar>
      {tutorialstep.author && <SidebarPublished date={tutorialstep.date} author={tutorialstep.author} />}
      <SidebarReferenceGroup reftype={`technologies`} accent={`danger`} references={tutorialstep.technologies} />
      <SidebarReferenceGroup reftype={`topics`} accent={`success`} references={tutorialstep.topics} />
      <SidebarSteps currentSlug={tutorialstep.slug} steps={tutorial.steps} />
    </Sidebar>
  );
  return (
    <SidebarLayout title={tutorialstep.title} subtitle={tutorialstep.subtitle}>
      {{
        sidebar,
        topNav,
        bottomNav,
        main: (
          <>
            {tutorialstep ? (
              <>
                {longVideoJsOptions && (
                  <Element name="full-video" className="element" style={{ marginTop: '1rem' }}>
                    <VideoPlayer {...longVideoJsOptions} />
                  </Element>
                )}
                {tutorialstep.html && (
                  <Element name="in-depth" className="element" style={{ marginTop: '1rem' }}>
                    <header className="is-size-3 is-bold">In Depth</header>
                    <div className="columns">
                      <div className="column is-11-desktop content" dangerouslySetInnerHTML={{ __html: tutorialstep.html }} />
                    </div>
                  </Element>
                )}
              </>
            ) : null}
          </>
        )
      }}
    </SidebarLayout>
  );
};

export default TutorialStepWrapper(TutorialStep);

// import { Element } from 'react-scroll';
// import Sidebar from '../../components/sidebar/Sidebar';
// import SidebarPublished from '../../components/sidebar/SidebarPublished';
// import SidebarReferenceGroup from '../../components/sidebar/SidebarReferencesGroup';
// import SidebarSteps, { IStep } from '../../components/sidebar/SidebarSteps';
// import SidebarLayout from '../../layouts/SidebarLayout';
// import VideoPlayer from '../../components/VideoPlayer';
// import BottomNav from '../../../tmp/tutorials/BottomNav';
// import { ITutorialStepNode } from './models';
// import TopNav from '../../../tmp/tutorials/TopNav';
// import { getPrevNextBySlug } from '../../../tmp/tutorials/utils';

// interface ITutorialStepProps {
//   data: {
//     markdownRemark: ITutorialStepNode;
//   };
// }
//
// class TutorialStep extends Component<ITutorialStepProps> {
//   render() {
//     const { data } = this.props;
//     const tutorialStep = data.markdownRemark;
//     const { fields, frontmatter } = tutorialStep;
//     const { tutorial } = fields;
//     const { tutorialsteps } = tutorial.fields;
//
//     // Flatten into the minimum needed for the sidebar steps component
//     const sidebarSteps: IStep[] = tutorialsteps.map(step => {
//       return {
//         target: step.fields.slug,
//         label: step.frontmatter.title
//       };
//     });
//
//     const thisAuthor = fields.author;
//     const author = {
//       title: thisAuthor.frontmatter.title,
//       headshot: thisAuthor.frontmatter.headshot,
//       href: thisAuthor.fields.slug
//     };
//     const sidebar = (
//       <Sidebar>
//         <SidebarPublished date={frontmatter.date} author={author} />
//         <SidebarReferenceGroup reftype={`technologies`} accent={`danger`} references={frontmatter.technologies} />
//         <SidebarReferenceGroup reftype={`topics`} accent={`success`} references={frontmatter.topics} />
//         <SidebarSteps currentSlug={tutorialStep.fields.slug} steps={sidebarSteps} />
//       </Sidebar>
//     );
//
//     // Up, Previous, Next
//     const navUp = { label: tutorial.frontmatter.title, slug: tutorial.fields.slug };
//     const prevNext = getPrevNextBySlug(
//       tutorial.fields.tutorialsteps.map(step => {
//         return { label: step.frontmatter.title, slug: step.fields.slug };
//       }),
//       tutorialStep.fields.slug
//     );
//
//     const navPrevious = prevNext.previous;
//     const navNext = prevNext.next;
//
//     // Video
//     const longVideo = frontmatter.longVideo;
//     const longVideoJsOptions = longVideo
//       ? {
//           controls: true,
//           poster: longVideo.poster.publicURL,
//           fluid: true,
//           // height: 720,
//           // width: 1024,
//           techOrder: ['youtube'],
//           sources: [
//             {
//               src: longVideo.url,
//               type: 'video/youtube'
//             }
//           ]
//         }
//       : null;
//
//     return (
//       <SidebarLayout
//         topNav={<TopNav up={navUp} previous={navPrevious} next={navNext} />}
//         title={frontmatter.title}
//         subtitle={frontmatter.subtitle}
//         sidebar={sidebar}
//         bottomNav={<BottomNav previous={navPrevious} next={navNext} />}
//       >
//         {tutorialStep ? (
//           <>
//             {longVideoJsOptions && (
//               <Element name="full-video" className="element" style={{ marginTop: '1rem' }}>
//                 <VideoPlayer {...longVideoJsOptions} />
//               </Element>
//             )}
//             {tutorialStep.html && (
//               <Element name="in-depth" className="element" style={{ marginTop: '1rem' }}>
//                 <header className="is-size-3 is-bold">In Depth</header>
//                 <div className="columns">
//                   <div className="column is-11-desktop content" dangerouslySetInnerHTML={{ __html: tutorialStep.html }} />
//                 </div>
//               </Element>
//             )}
//           </>
//         ) : null}
//       </SidebarLayout>
//     );
//   }
// }
//
// export default TutorialStep;

export const query = graphql`
  query($path: String!) {
    resource: markdownRemark(fields: { slug: { eq: $path } }) {
      excerpt(pruneLength: 250)
      html
      id
      fields {
        slug
      }
      frontmatter {
        type
        date(formatString: "MMMM Do, YYYY")
        title
        subtitle
        author
        technologies
        topics
        leadin
        seealso {
          title
          href
        }
        shortVideo {
          url
          poster {
            publicURL
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        longVideo {
          url
          poster {
            publicURL
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    tutorials: allMarkdownRemark(filter: { frontmatter: { type: { eq: "tutorial" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            steps
          }
        }
      }
    }

    tutorialsteps: allMarkdownRemark(filter: { frontmatter: { type: { eq: "tutorialstep" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }

    authors: allMarkdownRemark(filter: { frontmatter: { type: { eq: "author" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            label
            headshot {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }

    technologies: allMarkdownRemark(filter: { frontmatter: { type: { eq: "technology" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            label
          }
        }
      }
    }

    topics: allMarkdownRemark(filter: { frontmatter: { type: { eq: "topic" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            label
          }
        }
      }
    }
  }
`;
// export const query = graphql`
//   query($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       excerpt(pruneLength: 250)
//       html
//       id
//       fields {
//         slug
//         tutorial {
//           frontmatter {
//             title
//           }
//           fields {
//             slug
//             tutorialsteps {
//               fields {
//                 slug
//               }
//               frontmatter {
//                 title
//               }
//             }
//           }
//         }
//         author {
//           excerpt(pruneLength: 250)
//           html
//           id
//           fields {
//             slug
//           }
//           frontmatter {
//             type
//             label
//             title
//             subtitle
//             date
//             headshot {
//               publicURL
//               childImageSharp {
//                 fluid(maxWidth: 1000) {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//           }
//         }
//       }
//       frontmatter {
//         type
//         date(formatString: "MMMM Do, YYYY")
//         title
//         subtitle
//         technologies
//         topics
//         leadin
//         seealso {
//           title
//           href
//         }
//         shortVideo {
//           url
//           poster {
//             publicURL
//             childImageSharp {
//               fluid(maxWidth: 1000) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//         longVideo {
//           url
//           poster {
//             publicURL
//             childImageSharp {
//               fluid(maxWidth: 1000) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//       }
//     }
//
//     authors: allMarkdownRemark(filter: { frontmatter: { type: { eq: "author" } } }) {
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             label
//             headshot {
//               publicURL
//               childImageSharp {
//                 fluid(maxWidth: 1000) {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//
//     technologies: allMarkdownRemark(filter: { frontmatter: { type: { eq: "technology" } } }) {
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             label
//           }
//         }
//       }
//     }
//
//     topics: allMarkdownRemark(filter: { frontmatter: { type: { eq: "topic" } } }) {
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             label
//           }
//         }
//       }
//     }
//   }
// `;
