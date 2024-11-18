import { useState } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import Navbar from "./navbar.js";
import Navbar2 from "./navbar2.js";
import Bottomnav from "./bottomnav.js";
import Footer from "./footer.js";

function Privacy() {
  return (
    <>
      <Navbar />
      <Navbar2 />
      <Bottomnav />

      <div class="container-fluid ">
        <div class="row px-0 justify-content-center mx-0">
          <div class="col-lg-10 col-12 my-3">
            <div class="card pt-2 px-4 mb-lg-0 mb-5 rounded-0">
              <div class="card-body">
                <h2>Privacy Policy</h2>
                <p>
                  Welcome to the accessories-bazar.com/ website (the &quot;Site&quot;)
                  operated by mPair Technologies Ltd., We respect your privacy
                  and want to protect your personal information. To learn more,
                  please read this Privacy Policy.
                </p>
                <li>
                  This Privacy Policy explains how we collect, use and (under
                  certain conditions) disclose your personal information. This
                  Privacy Policy also explains the steps we have taken to secure
                  your personal information. Finally, this Privacy Policy
                  explains your options regarding the collection, use and
                  disclosure of your personal information. By visiting the Site
                  directly or through another site, you accept the practices
                  described in this Policy.
                </li>
                <li>
                  Data protection is a matter of trust and your privacy is
                  important to us. We shall therefore only use your name and
                  other information which relates to you in the manner set out
                  in this Privacy Policy. We will only collect information where
                  it is necessary for us to do so and we will only collect
                  information if it is relevant to our dealings with you.
                </li>
                <li>
                  We will only keep your information for as long as we are
                  either required to by law or as is relevant for the purposes
                  for which it was collected.
                </li>
                <li>
                  We will cease to retain your personal data, or remove the
                  means by which the data can be associated with you, as soon as
                  it is reasonable to assume that such retention no longer
                  serves the purposes for which the personal data was collected,
                  and is no longer necessary for any legal or business purpose.
                </li>
                <li>
                  You can visit the Site and browse without having to provide
                  personal details. During your visit to the Site you remain
                  anonymous and at no time can we identify you unless you have
                  an account on the Site and log on with your user name and
                  password.
                </li>
                <li>Data that we collect</li>
                <ul>
                  <li>
                    We may collect various pieces of information if you seek to
                    place an order for a product with us on the Site.
                  </li>
                  <li>
                    We collect, store and process your data for processing your
                    purchase on the Site and any possible later claims, and to
                    provide you with our services. We may collect personal
                    information including, but not limited to, your title, name,
                    gender, date of birth, email address, postal address,
                    delivery address (if different), telephone number, mobile
                    number, fax number, payment details, payment card details or
                    bank account details.
                  </li>
                </ul>
                <p class="fw-bold">Privacy Policy for Commercial/End Users</p>
                <p>
                  Accessories-bazar is committed to your right to privacy and we
                  recognize the importance of privacy to our customers, counter
                  parties and website visitors. By reading this statement you
                  consent to the processing of your Information in accordance
                  with this Privacy Policy (Policy). We will keep this Policy
                  under review and any changes made from time to time will be
                  posted on this page. This Policy sets out details of the
                  Information we collect about you and the ways in which we may
                  use that Information.
                </p>

                <p class="fw-bold">
                  Personal and/or Commercial Business information
                </p>
                <p>
                  Information means the information/data provided by you, other
                  personal, financial and commercial information and the
                  documents (including but not limited to any document,
                  commercial paper, deed or other form) provided in respect of
                  all herein.
                </p>
                <p>
                  Accessories-bazar endeavors to collect and use your Information
                  only with your knowledge and consent. We may gather your
                  Information from a purchase through your customer enquiries,
                  via email, through our business dealings or through our
                  customer services team, when you request product information
                  or, when you register online or enter any promotions or
                  competitions through any channel. For web visitors, a user
                  must first complete a registration form. During registration,
                  the user is required to give their contact information (such
                  as name and email address). Demographic and geographic
                  Information may be requested. Accessories-bazar does not share any
                  personal or private customer/business Information submitted
                  online with third parties other than as set out herein. This
                  Information will be stored, analyzed and used to assist
                  Accessories-bazar to improve our services.
                </p>
                <p>
                  The Information you provide on the Accessories-bazar website and/or
                  other communication channels will be held only by Accessories-bazar
                  and its affiliates or duly authorized agents. Your Information
                  will not be given or sold to any outside organization for
                  marketing purposes without your consent.
                </p>

                <p class="fw-bold">Data Collection and Processing</p>
                <p>
                  By submitting your Information you accept that your details
                  and related Information will be managed, stored, transferred
                  and processed by Accessories-bazar in accordance with applicable
                  policies and procedures which may include using third party
                  services for such management, storage, transfer, and/or
                  processing. Please note that Accessories-bazar may provide
                  aggregate statistics and general Information about our
                  customers, sales, traffic patterns and related site
                  information to reputable third-parties, but these statistics
                  and general information will not include personally
                  identifying Information. Accessories-bazar shall take reasonable
                  measures to protect any Information provided and maintain
                  privacy of such Information in accordance with standard
                  applicable practices.
                </p>
                <p class="fw-bold">Purpose of collecting Information</p>
                <p>
                  The Information is used to contact the user about the services
                  on our site for which they have expressed interest.
                </p>
                <p>
                  If you are a Accessories-bazar registered customer, we may use your
                  Information for the purposes of: (a) verifying that you are an
                  authorized user if you call the Accessories-bazar customer
                  services, (b) informing you of any service related changes
                  affecting your purchase.
                </p>
                <p>
                  Accessories-bazar may also use the Information for the purposes of:
                  (c) providing you with Accessories-bazar and related products and
                  services, (d) informing you of Accessories-bazar special offers and
                  any products and services offered by the companies that we
                  think may be of interest to you. Accessories-bazar may also be
                  obliged to disclose your Information to meet any legal or
                  government regulatory requirements or obligations in
                  accordance with the applicable laws.
                </p>
                <p>
                  From time to time Accessories-bazar also requests Information from
                  users via our online surveys and satisfaction questionnaires.
                  Participation in these surveys is completely voluntary and the
                  user therefore has a choice whether or not to disclose this
                  Information. Information requested may include contact
                  information (such as name and address). Survey Information
                  will be used for purposes of monitoring or improving customer
                  experience.
                </p>
                <p class="fw-bold">Comments and Questions</p>
                <p>
                  Accessories-bazar reserves the right to amend or modify this Policy
                  at any time and in response to changes in applicable with the
                  data protection and privacy legislation. If you have any
                  comments or questions about this Policy or about the
                  Information we have gathered about you, please contact Accessories-bazar
                  Mall.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withRouter(Privacy);
