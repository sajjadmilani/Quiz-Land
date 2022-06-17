import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';
import 'tippy.js/dist/tippy.css';
import Organizer from '..';
import { PageContext } from '../../Contexts/PageContext';
import Loading from '../../Loading';
import ResultItem from './ResultItem';

const Results = () => {

  const { user } = useAuth0();
  const [results, setResults] = useState({});
  const [status, setStatus] = useState("idle");

  const { setPageName } = useContext(PageContext);
  setPageName("Quizzes Results");

  useEffect(() => {
    setStatus("loading");
    if (user) {
      fetch(`/api/results/${user.sub}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.data);
          setStatus("idle");
        });
    }
  }, [user]);


  return <>
    <Organizer>
      {status === "loading" && <Loading />}
      {status === "idle" && results.length > 0 && <>
        <Wrapper>
          {results?.map((result, index) => {
            return <ResultItem key={result._id} result={result} index={index} />;
          })}
        </Wrapper>
      </>}

    </Organizer>
  </>;
};

const Wrapper = styled.div`
  max-width: 900px;
  margin:auto;

  box-sizing: border-box;
`;


export default Results;