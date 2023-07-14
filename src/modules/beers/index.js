import { useEffect, useState } from "react";
import axios from "axios";
import { useStoreBeers } from "./store";
import styles from "./beersStyle.module.css";
import { Link } from "react-router-dom";

const Beers = () => {
  const data = useStoreBeers((state) => state.data);
  const isLoading = useStoreBeers((state) => state.isLoading);
  const addData = useStoreBeers((state) => state.addData);
  const removeData = useStoreBeers((state) => state.removeData);

  const [checkId, setCheckId] = useState([]);
  const [filterValue, setFilterValue] = useState(15);
  const [pageValue, setPageValue] = useState(1);

  const fetchData = async () => {
    const result = await axios.get(
      `https://api.punkapi.com/v2/beers?page=${pageValue}`
    );
    addData(result.data);
  };

  useEffect(() => {
    fetchData();
    setPageValue(pageValue + 1);
  }, []);

  useEffect(() => {
    if (data.length === 0 && !isLoading) {
      setFilterValue(25);
      fetchData();
      setPageValue(pageValue + 1);
    }
  }, [data]);

  const deleteBlock = () => {
    checkId.forEach((v) => {
      removeData(v);
      if (filterValue < 25) setFilterValue((prev) => prev++);
    });
    setCheckId([]);
  };

  const rightButtonClick = (e, id) => {
    e.preventDefault();

    if (checkId.includes(id)) {
      const temp = checkId.filter((v) => v !== id);
      setCheckId(temp);
      return;
    }

    setCheckId((prev) => [...prev, id]);
  };

  return (
    <div>
      {checkId.length > 0 && <button onClick={deleteBlock}>Delete</button>}
      <div className={styles.container}>
        {data.slice(0, filterValue).map((item) => (
          <Link
            to={`/${item.id}`}
            state={item}
            className={`${styles.block} ${
              checkId.includes(item.id) && styles.block_check
            }`}
            key={item.id}
            onContextMenu={(event) => rightButtonClick(event, item.id)}
          >
            <img src={item.image_url} />
            <div className={styles.info}>
              <div className={styles.block_info}>
                <div>Name:</div>
                <div>{item.name}</div>
              </div>
              <div className={styles.block_info}>
                <div>Description:</div>
                <div className={styles.description}>{item.description}</div>
              </div>
              <div className={styles.block_info}>
                <div>Tagline:</div>
                <div className={styles.tagline}>{item.tagline}</div>
              </div>
              <div className={styles.block_info}>
                <div>First brewed:</div>
                <div>{item.first_brewed}</div>
              </div>
            </div>
          </Link>
        ))}
        {/* {data.slice(0, filterValue).map((item) => (
          <div
            className={`${styles.block} ${
              checkId.includes(item.id) && styles.block_check
            }`}
            key={item.id}
            onContextMenu={(event) => rightButtonClick(event, item.id)}
          >
            <img src={item.image_url} />
            <div className={styles.info}>
              <div className={styles.block_info}>
                <div>Name:</div>
                <div>{item.name}</div>
              </div>
              <div className={styles.block_info}>
                <div>Description:</div>
                <div className={styles.description}>{item.description}</div>
              </div>
              <div className={styles.block_info}>
                <div>Tagline:</div>
                <div className={styles.tagline}>{item.tagline}</div>
              </div>
              <div className={styles.block_info}>
                <div>First brewed:</div>
                <div>{item.first_brewed}</div>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Beers;
