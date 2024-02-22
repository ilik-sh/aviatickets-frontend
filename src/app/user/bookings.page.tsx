import React from "react";
import Header from "components/header.comp";
import Layout from "components/layout.comp";
import BookingsContent from "./components/bookings/bookings-content.comp";

const BookingsPage: React.FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <BookingsContent />
      </Layout>
    </>
  );
};

export default BookingsPage;
