import Layout from "components/layout.comp";
import { FC } from "react";
import SearchTicketsContent from "./components/search-tickets-content.comp";
import Header from "components/header.comp";
import { LocalStorageKeys } from "enums/local-storage-keys.enum";
import ChatCollapse from "app/chat/chat.collapse";

const SearchTicketsPage: FC = () => {
  return (
    <>
      <Header />
      {localStorage.getItem(LocalStorageKeys.AccessToken) && <ChatCollapse />}
      <Layout>
        <SearchTicketsContent />
      </Layout>
    </>
  );
};

export default SearchTicketsPage;
