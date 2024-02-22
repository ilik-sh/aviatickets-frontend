import Header from "components/header.comp";
import Layout from "components/layout.comp";
import CreateBookingContent from "./components/create-booking-content.comp";
import { LocalStorageKeys } from "enums/local-storage-keys.enum";
import ChatCollapse from "app/chat/chat.collapse";

const CreateBookingPage = () => {
  return (
    <>
      <Header />
      {localStorage.getItem(LocalStorageKeys.AccessToken) && <ChatCollapse />}
      <Layout>
        <CreateBookingContent />
      </Layout>
    </>
  );
};

export default CreateBookingPage;
