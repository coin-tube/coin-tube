import React, { useEffect } from 'react';
import { getCreators } from '../../commons/firestore';

function AdminPage() {
  const [creators, setCreators] = React.useState([]);

  const loadCreators = async () => {
    const creators = await getCreators();
    console.log('creators', creators);
    setCreators(creators);
  };

  useEffect(() => {
    loadCreators();
  }, []);

  return (
    <div>
      <div>AdminPage</div>
      <hr />

      <div>
        {creators.map((creator) => (
          <div key={creator.id}>
            <span style={{ marginRight: 20 }}>{creator.description}</span>
            <span>
              <a href={creator.link} target="_blank">
                {creator.link}
              </a>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
