import { graphql, useStaticQuery } from 'gatsby';

export const usePortfolioMenu = () => {
  const {settings2, slugs} = useStaticQuery(
    graphql`
        query {
            settings2: settingsJson(id: {eq: "portfolio-menu-settings"}) {
                portfolioMenu {
                    url
                    title
                }
            }
        }
    `,
  );
  return {settings2, slugs};
};
