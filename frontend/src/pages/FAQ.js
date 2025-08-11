import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/pages/FAQ.css";
import { CAccordion } from "@coreui/react";
import { CAccordionBody } from "@coreui/react";
import { CAccordionHeader } from "@coreui/react";
import { CAccordionItem } from "@coreui/react";

function FAQ() {
  return (
    <div style={{ position: "relative", height: "128vh" }}>
      <Navbar />
      <div id="FAQContainer">
        <h1 id="FAQHeading">FAQs</h1>
        <div id="FAQProducts">
          <h1 id="FAQProductsHeading">Products</h1>
          <CAccordion>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>
                Q: What are the ingredients in your product?
              </CAccordionHeader>
              <CAccordionBody>
                <strong>
                  You can find the information on product description page.
                </strong>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>
                Q: Why can't I purchase certain BelleZa products that are
                available in India?
              </CAccordionHeader>
              <CAccordionBody>
                <strong>
                  Please note that while some BelleZa products are available in
                  India, the release schedule may vary by region due to
                  differences in export regulations, customs policies, and
                  shipping timelines.
                </strong>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={3}>
              <CAccordionHeader>
                Q: Why are some BelleZa products out of stock in India?
              </CAccordionHeader>
              <CAccordionBody>
                <strong>
                  Product availability may fluctuate due to supply chain
                  challenges, including high demand, manufacturing delays, or
                  shipping issues. We are working to restock BelleZa products as
                  soon as possible to meet customer needs.
                </strong>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </div>
        <div id="FAQOrders">
          <h1 id="FAQProductsHeading">Orders</h1>
          <CAccordion>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>Q: How do I place an order?</CAccordionHeader>
              <CAccordionBody>
                <strong>
                  Simply select the product you want to purchase and follow the
                  steps below: <br />
                  Step 1: Register or log in your account / check out as guest{" "}
                  <br />
                  Step 2: To add items to your cart, click on 'Add to Cart' with
                  your desired quantity. <br />
                  Step 3: To review your items, click on the 'Cart' icon located
                  at the upper right corner of the page. <br />
                  Step 4: if you have an applicable 'Promo Code', enter it and
                  click on ‘Apply’. Changes will take effect once you have
                  successfully entered the code. <br />
                  Step 5: Click on ‘Checkout’ and your order summary will appear
                  for your review. <br />
                  Step 6: Fill in your Personal Details, Shipping Address, then
                  select your preferred Shipping Method and Payment Option, then
                  click on ‘Continue’ to proceed with the payment. <br />
                  Step 7: You will receive a confirmation email shortly after
                  you have successfully placed your order.
                </strong>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>
                Q: How do I track my order status?
              </CAccordionHeader>
              <CAccordionBody>
                <strong>
                  Once your order has been confirmed, you will be sent an order
                  confirmation summary by e-mail. This contains the following
                  information: <br />
                  <br />- Order number
                  <br />
                  - Order date
                  <br />
                  - List of items ordered
                  <br />
                  - Total amount of the order <br />
                  <br />
                  If you do not receive this confirmation e-mail, (and you've
                  checked your spam), it may be that your order has not been
                  acknowledged.
                </strong>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={3}>
              <CAccordionHeader>
                Q: How can I obtain more advice or product information?
              </CAccordionHeader>
              <CAccordionBody>
                <strong>
                  You may visit the "Product Page" section, or contact innisfree
                  customer services.
                </strong>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FAQ;
