/* Various models used throughout the site*/

import { ResourceCardAuthorProps } from 'gatsby-theme-bulmaio/src/components/resourcecard/author';
import { Thumbnail } from 'gatsby-theme-bulmaio/src/models';
import { ResourceCardTechnologies } from 'gatsby-theme-bulmaio/src/components/resourcecard/technology';
import { ResourceCardProducts } from 'gatsby-theme-bulmaio/src/components/resourcecard/product';
import { ResourceCardTopics } from 'gatsby-theme-bulmaio/src/components/resourcecard/topic';

export interface ListedResource {
  // Data needed for listing in a resource card
  fields: {
    slug: string;
  }
  frontmatter: {
    type: string;
    title: string;
    subtitle?: string;
    date: string;
    author?: ResourceCardAuthorProps;
    technologies: ResourceCardTechnologies;
    products: ResourceCardProducts;
    topics: ResourceCardTopics;
    thumbnail: Thumbnail
  }
}

export type ListedResources = ListedResource[];
export type ListedResourcesQuery = {resources: ListedResources}
