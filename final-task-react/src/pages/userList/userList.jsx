import React, { useState } from "react";

import styles from './userList.module.scss';
import PageTitle from '../../components/pageTitle/pageTitle';
import { userStore } from "../../stores/usersStore/usersStore";
import UserItem from "../../components/userItem/UserItem";
import Pagination from "../../components/pagination/Pagination";

const UserList = () => {

  const { allUsers, page } = userStore;
  const [currentPage, setCurrentPage] = useState(page);

  const getUserChunks = (usersArray, limit) => {
    const chunks = [];
    const amount = Math.ceil(usersArray.length / limit);

    for (let i = 0; i < amount; i++) {
      chunks.push(usersArray.slice(i * limit, (i * limit) + limit));
    }
    return chunks;
  }

  const usersChunks = getUserChunks(allUsers, 10);

  return (
    <main className={styles.main}>
      <PageTitle title='Пользователи' />
      <section className={styles.page}>
        <ul className={styles.users}>
        {
          usersChunks[currentPage].map(user => <UserItem userInfo={user} key={user.id} />)
        }
        </ul>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentChunkLength={5}
          itemsTotal={allUsers.length}
          limit={10}
        />
      </section>
    </main>
  );
}

export default UserList;