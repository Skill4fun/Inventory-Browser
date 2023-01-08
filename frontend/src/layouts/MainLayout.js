import React, { useState, useEffect } from 'react';
import { Grid, Message } from 'semantic-ui-react';
import { useNavbarContext } from '../helper/NavbarContextProvider';
import { useLoggedInUserContext } from '../helper/LoggedInUserContextProvider';
import { fetchArticles } from '../helper/utils';

function MainLayout(
  {
    navbarContextFn = useNavbarContext, loggedInContextFn = useLoggedInUserContext,
    fetchFn = fetchArticles, BrowserTable, ListTable, Article,
  },
) {
  const { isInventoryClicked, isListClicked } = navbarContextFn();
  const { loggedInUser } = loggedInContextFn();
  const [articlesList, setArticlesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(async () => {
    const { status, message, articles } = await fetchFn();
    if (status === 200) {
      setArticlesList(await articles.sort((
        { publish_date: firstDate }, { publish_date: secondDate },
      ) => { return new Date(secondDate) - new Date(firstDate); }));
    } else { setErrorMessage(`| :: ${status} :: |    ${message}  :(`); }
  }, []);

  return (
    <Grid
      data-testid="main-layout"
      stackable
      stretched
      centered
      columns={3}
      reversed={(!isInventoryClicked && !!isListClicked) && 'computer tablet'}
    >
      {(loggedInUser?.userId && !!isListClicked && !!ListTable)
        && (
          <Grid.Column data-testid="grid-ListTable" width={16}>
            <ListTable />
          </Grid.Column>
        )}
      {(loggedInUser?.userId && !!isInventoryClicked && !!BrowserTable)
        && (
          <Grid.Column data-testid="grid-BrowserTable" width={16} floated="left">
            <BrowserTable />
          </Grid.Column>
        )}

      {((articlesList.length !== 0 && !isInventoryClicked) || (articlesList.length !== 0 && !loggedInUser?.userId))
        && articlesList.map((article, index) => (
          index <= 11
          && (
            <Grid.Column data-testid={`grid-${index}`} key={article.id}>
              <Article
                key={`${article.title}${article.id}`}
                index={index}
                photoUrl={article.photoUrl}
                title={article.nameEn}
                descEn={article.descEn}
                date={article.publish_date}
                factoryProductId={article.factoryProductId}
                eanCode={article.eanCode}
                brand={article.brand}
                priceExpEur={article.priceExpEur}
                specialPrice={article.special_price}
                expirationDate={article.expirationDate}
              />
            </Grid.Column>
          )))}

      {!!errorMessage && <Message error content={errorMessage} />}
    </Grid>
  );
}

export default MainLayout;
