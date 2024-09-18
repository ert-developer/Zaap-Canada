import React from 'react';
import {ScrollView, Text, View, StyleSheet, Linking} from 'react-native';
import {Color} from '../../assets/static/globalStyles';
import {widthToDp} from '../../responsive/responsive';

const AcceptableUsePolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Acceptable Use Policy</Text>
      <Text style={styles.subheader}>Last updated August 15, 2024</Text>
      <Text style={styles.paragraph}>
        This Acceptable Use Policy ("Policy") is part of our Terms and Conditions ("Legal Terms") and should therefore
        be read alongside our main Legal Terms:
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.zaapondemand.ca/terms')}>
          https://www.zaapondemand.ca/terms
        </Text>
        . If you do not agree with these Legal Terms, please refrain from using our Services. Your continued use of our
        Services implies acceptance of these Legal Terms.
      </Text>
      <Text style={styles.paragraph}>
        Please carefully review this Policy which applies to any and all: (a) uses of our Services (as defined in 'Legal
        Terms') (b) forms, materials, consent tools, comments, post, and all other content available on the Services
        ('Content') and (c) material which you contribute to the Services including any upload, post, review,
        disclosure, ratings, comments, chat etc. in any forum, chatrooms, reviews, and to any interactive services
        associated with it ('Contribution').
      </Text>

      <Text style={styles.subheader}>WHO WE ARE</Text>
      <Text style={styles.paragraph}>
        We are Zaapr Online Services Private Limited, doing business as ZAAP - Hire or Work locally ("Company", "we",
        "us", or "our"), a company registered in Canada at Toronto, Ontario. We operate the mobile application ZAAP -
        Hire or Work Locally (the "App"), as well as any other related products and services that refer or link to this
        Policy (collectively, the "Services").
      </Text>

      <Text style={styles.subheader}>USE OF THE SERVICES</Text>
      <Text style={styles.paragraph}>
        When you use the Services, you warrant that you will comply with this Policy and with all applicable laws. You
        also acknowledge that you may not:
      </Text>
      <Text style={styles.listItem}>
        • Systematically retrieve data or other content from the Services to create or compile, directly or indirectly,
        a collection, compilation, database, or directory without written permission from us.
      </Text>
      <Text style={styles.listItem}>
        • Make any unauthorised use of the Services, including collecting usernames and/or email addresses of users by
        electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated
        means or under false pretences.
      </Text>
      <Text style={styles.listItem}>
        • Circumvent, disable, or otherwise interfere with security-related features of the Services, including features
        that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services
        and/or the Content contained therein.
      </Text>
      <Text style={styles.listItem}>• Engage in unauthorised framing of or linking to the Services.</Text>
      <Text style={styles.listItem}>
        • Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account
        information such as user passwords.
      </Text>
      <Text style={styles.listItem}>
        • Make improper use of our support services or submit false reports of abuse or misconduct.
      </Text>
      <Text style={styles.listItem}>
        • Engage in any automated use of the system, such as using scripts to send comments or messages, or using any
        data mining, robots, or similar data gathering and extraction tools.
      </Text>
      <Text style={styles.listItem}>
        • Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to
        the Services.
      </Text>
      <Text style={styles.listItem}>
        • Attempt to impersonate another user or person or use the username of another user.
      </Text>
      <Text style={styles.listItem}>
        • Use any information obtained from the Services in order to harass, abuse, or harm another person.
      </Text>
      <Text style={styles.listItem}>
        • Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for
        any revenue-generating endeavour or commercial enterprise.
      </Text>
      <Text style={styles.listItem}>
        • Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a
        part of the Services, except as expressly permitted by applicable law.
      </Text>
      <Text style={styles.listItem}>
        • Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any
        portion of the Services.
      </Text>
      <Text style={styles.listItem}>
        • Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the
        Services to you.
      </Text>
      <Text style={styles.listItem}>• Delete the copyright or other proprietary rights notice from any Content.</Text>
      <Text style={styles.listItem}>
        • Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other
        code.
      </Text>
      <Text style={styles.listItem}>
        • Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including
        excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any
        party's uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes
        with the use, features, functions, operation, or maintenance of the Services.
      </Text>
      <Text style={styles.listItem}>
        • Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active
        information collection or transmission mechanism, including without limitation, clear graphics interchange
        formats ("gifs"), 1x1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or
        "passive collection mechanisms" or "pcms").
      </Text>
      <Text style={styles.listItem}>
        • Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or
        distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or
        offline reader that accesses the Services, or using or launching any unauthorised script or other software.
      </Text>
      <Text style={styles.listItem}>
        • Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.
      </Text>
      <Text style={styles.listItem}>
        • Use the Services in a manner inconsistent with any applicable laws or regulations.
      </Text>
      <Text style={styles.listItem}>• Use the Services to advertise or offer to sell goods and services.</Text>
      <Text style={styles.listItem}>• Sell or otherwise transfer your profile.</Text>
      <Text style={styles.subheader}>COMMUNITY/FORUM GUIDELINES</Text>
      <Text style={styles.paragraph}>ZAAP - Hire or Work Locally's Community and Forum Guidelines...</Text>
      <Text style={styles.listItem}>
        • Respectful Communication:Engage in respectful and constructive conversations. Personal attacks, harassment,
        hate speech, and discriminatory remarks will not be tolerated.
      </Text>
      <Text style={styles.listItem}>
        • Accuracy and Honesty: Provide accurate and honest information in all posts and interactions. Misleading or
        false information is prohibited.
      </Text>
      <Text style={styles.listItem}>
        • Prohibited Content: Do not post or share content that includes: Narcotics, steroids, drugs, and other
        controlled substances. Knives, weapons, firearms, ammunition, or firearm parts. Sexually oriented materials or
        services. Items you do not have control or possession of. Any illegal activities or content.
      </Text>
      <Text style={styles.listItem}>
        • Privacy and Security: Do not share personal information about yourself or others. Respect the privacy of all
        members and do not engage in activities that compromise security.
      </Text>
      <Text style={styles.listItem}>
        • No Spam: Avoid spamming the community with irrelevant or repetitive posts, advertisements, or promotional
        content. Use designated channels for promotions and advertisements.
      </Text>
      <Text style={styles.listItem}>
        • Respect Intellectual Property: Do not post content that infringes on the intellectual property rights of
        others, including copyrighted material, trademarks, or proprietary information.
      </Text>
      <Text style={styles.listItem}>
        • Constructive Feedback: Provide feedback in a constructive manner. Criticisms should be aimed at ideas or
        processes, not individuals.
      </Text>
      <Text style={styles.listItem}>
        • Compliance with Laws: Ensure all posts and activities comply with applicable laws and regulations. Illegal
        activities will be reported and addressed.
      </Text>
      <Text style={styles.listItem}>
        • Report Violations: If you encounter any violations of these guidelines, report them to the moderators or
        administrators for review and action.
      </Text>
      <Text style={styles.listItem}>
        • Moderation and Enforcement: The community moderators reserve the right to remove posts, suspend accounts, or
        take other actions to enforce these guidelines and maintain a positive environment.
      </Text>

      <Text style={styles.subheader}>CONTRIBUTIONS</Text>
      <Text style={styles.paragraph}>In this Policy, the term 'Contribution' means:</Text>
      <Text style={styles.listItem}>
        • Any data, information, software, text, code, music, scripts, sound, graphics, photos, videos, tags, messages,
        interactive features, or other materials that you post, share, upload, submit, or otherwise provide in any
        manner on or through to the Services; or
      </Text>
      <Text style={styles.listItem}>
        • Any other content, materials, or data you provide to Zaapr Online Services Private Limited or use with the
        Services.
      </Text>
      <Text style={styles.paragraph}>
        Some areas of the Services may allow users to upload, transmit, or post Contributions. We may but are under no
        obligation to review or moderate the Contributions made on the Services, and we expressly exclude our liability
        for any loss or damage resulting from any of our users' breach of this Policy. Please report any Contribution
        believe breaches this Policy; however, we will determine, in our sole discretion, whether a Contribution is
        indeed in breach of this Policy.
      </Text>
      <Text style={styles.paragraph}>You warrant that:</Text>
      <Text style={styles.listItem}>
        • You are the creator and owner of or have the necessary licences, rights, consents, releases, and permissions
        to use and to authorise us, the Services, and other users of the Services to use your Contributions in any
        manner contemplated by the Services and this Policy;
      </Text>
      <Text style={styles.listItem}>
        • All your Contributions comply with applicable laws and are original and true (if they represent your opinion
        or facts);
      </Text>
      <Text style={styles.listItem}>
        • The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or
        copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to
        the copyright, patent, trademark, trade secret, or moral rights of any third party; and you have the verifiable
        consent, release, and/or permission of each and every identifiable individual person in your Contributions to
        use the name or likeness of each and every such identifiable individual person to enable inclusion and use of
        your Contributions in any manner contemplated by the Services and this Policy.
      </Text>
      <Text style={styles.paragraph}>
        You also agree that you will not post, transmit, or upload any (or any part of a) Contribution that:
      </Text>
      <Text style={styles.listItem}>
        • Is in breach of applicable laws, regulation, court order, contractual obligation, this Policy, our Legal
        Terms, a legal duty, or that promotes or facilitates fraud or illegal activities;
      </Text>
      <Text style={styles.listItem}>
        • Is defamatory, obscene, offensive, hateful, insulting, intimidating, bullying, abusive, or threatening, to any
        person or group;
      </Text>
      <Text style={styles.listItem}>• is false, inaccurate, or misleading;</Text>
      <Text style={styles.listItem}>
        • Includes child sexual abuse material, or violates any applicable law concerning child pornography or otherwise
        intended to protect minors;
      </Text>
      <Text style={styles.listItem}>
        • Promotes violence, advocates the violent overthrow of any government, or incites, encourages, or threatens
        physical harm against another;
      </Text>
      <Text style={styles.listItem}>
        • Is obscene, lewd, lascivious, filthy, violent, harassing, libellous, slanderous, contains sexually explicit
        material, or is otherwise objectionable (as determined by us);
      </Text>
      <Text style={styles.listItem}>
        • Is discriminatory based on race, sex, religion, nationality, disability, sexual orientation, or age;
      </Text>
      <Text style={styles.listItem}>• Bullies, intimidates, humiliates, or insults any person;</Text>
      <Text style={styles.listItem}>
        • Promotes, facilitates, or assists anyone in promoting and facilitating acts of terrorism;
      </Text>
      <Text style={styles.listItem}>
        • Infringes, or assists anyone in infringing, a third party's intellectual property rights or publicity or
        privacy rights;
      </Text>
      <Text style={styles.listItem}>
        • Is deceitful, misrepresents your identity or affiliation with any person and/or misleads anyone as to your
        relationship with us or implies that the Contribution was made by someone else than you;
      </Text>
      <Text styles={styles.listItem}>
        • Contains unsolicited or unauthorised advertising, promotional materials, pyramid schemes, chain letters, spam,
        mass mailings, or other forms of solicitation that has been 'paid for', whether with monetary compensation or in
        kind; or
      </Text>
      <Text style={styles.listItem}>• Misrepresents your identity or who the Contribution is from.</Text>

      <Text style={styles.paragraph}>
        You may not use our Services to offer, present, promote, sell, give away or otherwise make available to others
        any good or service involving:
      </Text>

      <Text style={styles.listItem}>
        • Items that promote, encourage, facilitate, or instruct others how to engage in illegal activity,
      </Text>
      <Text style={styles.listItem}>
        • Controlled substances and/or other products that present a risk to consumer safety, narcotics, steroids, drug
        paraphernalia,
      </Text>
      <Text style={styles.listItem}>• Specific knives or other weapons regulated under applicable law,</Text>
      <Text style={styles.listItem}>• Firearms, ammunition, or certain firearm parts or accessories,</Text>
      <Text style={styles.listItem}>• Sexually oriented materials or services,</Text>
      <Text style={styles.listItem}>• Certain items before the seller has control or possession of the item,</Text>
      <Text style={styles.listItem}>• Stolen goods,</Text>
      <Text style={styles.listItem}>
        • Products or services identified by government agencies to be highly likely to be fraudulent, and
      </Text>
      <Text style={styles.listItem}>
        • Any transaction or activity that requires pre-approval without having obtained said approval.
      </Text>

      <Text style={styles.subheader}>REVIEW AND RATINGS</Text>
      <Text style={styles.paragraph}>When your Contribution is a review or rating, you also agree that:</Text>
      <Text style={styles.listItem}>
        • You have firsthand experience with the services being reviewed • your Contribution is true to your experience
        • You are not affiliated with competitors if posting negative reviews or linked in any way to them • you cannot
        make or offer any conclusions as to the legality of conduct • you cannot post any false or misleading statements
        • You do not and will not organise a campaign encouraging others to post reviews,whether positive or negative.
      </Text>

      <Text style={styles.subheader}>REPORTING A BREACH OF THIS POLICY</Text>
      <Text style={styles.paragraph}>
        We may but are under no obligation to review or moderate the Contributions made on the Services and we expressly
        exclude our liability for any loss or damage resulting from any of our users' breach of this Policy.
      </Text>
      <Text style={styles.paragraph}>If you consider that any Content or Contribution:</Text>

      <Text style={styles.listItem}>
        • Breach this Policy, please email us at help@zaapondemand.ca or refer to the contact details at the bottom of
        this document to let us know which Content or Contribution is in breach of this Policy and why; or
      </Text>
      <Text style={styles.listItem}>
        • Infringe any third-party intellectual property rights, please check out our Legal Terms for information about
        our copyright infringement reporting process here: http://www.zaapondemand.ca/terms
      </Text>

      <Text style={styles.subheader}>CONSEQUENCES OF BREACHING THIS POLICY</Text>
      <Text style={styles.paragraph}>
        The consequences for violating our Policy will vary depending on the severity of the breach and the user's
        history on the Services, by way of example: We may, in some cases, give you a warning and/or remove the
        infringing Contribution, however, if your breach is serious or if you continue to breach our Legal Terms and
        this Policy, we have the right to suspend or terminate your access to and use of our Services and, if
        applicable, disable your account. We may also notify law enforcement or issue legal proceedings against you when
        we believe that there is a genuine risk to an individual or a threat to public safety. We exclude our liability
        for all action we may take in response to any of your breaches of this Policy.
      </Text>
      <Text style={styles.subheader}>COMPLAINTS AND REMOVAL OF LEGITIMATE CONTENT</Text>
      <Text style={styles.paragraph}>
        If you consider that some Content or Contribution have been mistakenly removed or blocked from the Services,
        please refer to the contact details at the bottom of this document and we will promptly review our decision to
        remove such Content or Contribution. The Content or Contribution may stay 'down' whilst we conduct the review
        process. Yes, ZAAP - Hire or Work locally has a well-defined process for deciding whether and when to block
        user-generated content. Hereʼs how we manages this: Manual Review: A dedicated team of moderators manually
        reviews content that has been flagged by the system or reported by users. User Reporting: ZAAP - Hire or Work
        locally provides users with a straightforward reporting mechanism within the app and website, allowing them to
        report content they believe violates the platform's rules. Content will be blocked if it: Violates ZAAP - Hire
        or Work locallyʼs community guidelines (e.g., harassment, hate speech, nudity, violence). Promotes illegal
        activities or prohibited items (e.g., drugs, weapons). Compromises user safety or privacy. Is fraudulent,
        misleading, or deceptive. Users who repeatedly post content that violates guidelines are monitored, and
        persistent violations may lead to account suspension or termination. ZAAP - Hire or Work locally regularly
        reviews the effectiveness of the blocking process and makes adjustments based on feedback, legal developments,
        and changes in community standards.
      </Text>

      <Text style={styles.subheader}>DISCLAIMER</Text>
      <Text style={styles.paragraph}>
        Zaapr Online Services Private Limited is under no obligation to monitor usersʼ activities, and we disclaim any
        responsibility for any userʼs misuse of the Services. Zaapr Online Services Private Limited has no
        responsibility for any user or other Content or Contribution created, maintained, stored, transmitted, or
        accessible on or through the Services, and is not obligated to monitor or exercise any editorial control over
        such material. If Zaapr Online Services Private Limited becomes aware that any such Content or Contribution
        violates this Policy, Zaapr Online Services Private Limited may, in addition to removing such Content or
        Contribution and blocking your account, report such breach to the police or appropriate regulatory authority.
        Unless otherwise stated in this Policy, Zaapr Online Services Private Limited disclaims any obligation to any
        person who has not entered into an agreement with Zaapr Online Services Private Limited for the use of the
        Services.
      </Text>

      <Text style={styles.subheader}>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Text>
      <Text style={styles.paragraph}>
        If you have questions or comments about this notice, you may contact our support team by email at
        <Text style={styles.link} onPress={() => Linking.openURL('mailto:help@zaapondemand.ca')}>
          {' '}
          help@zaapondemand.ca
        </Text>
        .
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: widthToDp(4),
  },
  header: {
    fontSize: widthToDp(6),
    fontWeight: 'bold',
    color: Color.colorIndigo,
    marginVertical: widthToDp(2),
  },
  subheader: {
    fontSize: widthToDp(4),
    fontWeight: 'bold',
    marginVertical: widthToDp(2),
    color: Color.colorIndigo,
  },
  paragraph: {
    marginVertical: widthToDp(2),
    textAlign: 'justify',
    fontWeight: '400',
  },
  listItem: {
    lineHeight: 24,
    marginBottom: 5,
    textAlign: 'justify',
    paddingLeft: 15,
    fontWeight: '400',
  },
  link: {
    color: '#1e90ff',
  },
});

export default AcceptableUsePolicy;
