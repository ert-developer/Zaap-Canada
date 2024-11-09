import {FlatList, SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import ContactUsQuestionsStyles from './contact-us-questions-styles';
import CustomButton from '../../atoms/button/buttonComponent';
import {Text} from 'react-native';
import {useEffect, useState} from 'react';
import Collapsible from 'react-native-collapsible';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderComponent from '../../atoms/header/headerComponent';
import LegalScreen from './legal-scree';
import PoliciesScreen from './policy-screen';

const questionsList = [
  {
    category: 'Getting Started',
    questions: [
      {
        id: 1,
        question: 'How do I create an account on ZAAP?',
        answer:
          'You can sign up for ZAAP using your Gmail or Facebook account or Apple ID for a quick and easy registration process.',
      },
      {
        id: 2,
        question: 'Are there any age restrictions for creating an account?',
        answer: 'Yes, you must be at least 18 years old to create an account and use ZAAP',
      },
      {
        id: 3,
        question: 'Are there different account types for customers and service providers?',
        answer:
          'Yes, there are distinct account types for customers and service providers, each with different features and requirements.',
      },
      {
        id: 4,
        question: 'What should I do if I encounter issues during account creation?',
        answer:
          'If you experience any issues, check your internet connection and try again. If the problem persists, please contact our support team for assistance.',
      },
      {
        id: 5,
        question: 'Are there any fees to sign up or create an account on ZAAP?',
        answer: 'No, creating an account on ZAAP is completely free.',
      },
      {
        id: 6,
        question: 'How can I update my profile information?',
        answer:
          'To update your profile information, log in to your account and go to the profile settings. From there, you can edit your personal details, contact information, and other relevant information.',
      },
    ],
  },
  {
    category: 'Ad Posting',
    questions: [
      {
        id: 1,
        question: 'How do I post a ad on ZAAP?',
        answer:
          'To post a job, log into your account, click on the "Post Ad" button on the home screen, and fill in the required job details. Once you submit the job, it will be visible on the platform for service providers to apply.',
      },
      {
        id: 2,
        question: 'How do I set the pricing for the job I want to post?',
        answer:
          'The pricing for your job is based on your budget and the amount youʼre willing to spend for the service. When posting a job, you have the flexibility to set a price that reflects what you believe is fair and reasonable for the work you need done. Serviceproviders will review your offer and decide if they are interested in applying based on the budget youʼve set.',
      },
      {
        id: 3,
        question: 'Can I edit the job details after posting it?',
        answer:
          'Yes, you can edit the job details after posting it. Go to "My Jobs" and select the job from the list and click on edit to make changes.',
      },
      {
        id: 4,
        question: 'Can I cancel a job after posting it?',
        answer: 'Yes, you can cancel a job before the booking is confirmed.',
      },
      {
        id: 5,
        question: 'Are there any restrictions on the types of jobs I can post?',
        answer:
          'Yes, there are restrictions on the types of jobs you can post on ZAAP. Jobs related to illegal activities, sexually oriented services, or prohibited items such as narcotics, firearms, and weapons are not allowed. Please ensure your job postings adhere to these guidelines to help maintain a safe and compliant marketplace.',
      },
      {
        id: 6,
        question: 'How will I know if people are viewing my job posting?',
        answer:
          'You can check how many people have viewed your job by going to the "My Jobs" section. Simply select the job you posted to see the view count and other details.',
      },
      {
        id: 7,
        question: 'What should I do if I receive no responses to my job posting?',
        answer:
          'If you receive no responses, consider revising your job posting to make it more appealing. Review the title, description, and budget to ensure they are clear and competitive. You might also try promoting the job.',
      },
      {
        id: 8,
        question: 'How will I know if someone applied for my job?',
        answer:
          'Youʼll be notified when someone applies for your job. You can also check applications by going to the “My Jobs” section and selecting the job you posted. There, youʼll see a list of applicants and can review their profiles.',
      },
    ],
  },
  {
    category: 'Hiring',
    questions: [
      {
        id: 1,
        question: 'How do I choose a service provider for my job?',
        answer:
          'Once your job is posted, service providers will submit applications. You are responsible for reviewing their profiles, ratings, and portfolios to determine the best fit for your project. It is important to evaluate their qualifications thoroughly before making a hiring decision',
      },
      {
        id: 2,
        question: 'What is a service provider portfolio?',
        answer: `A service provider portfolio is a collection of work samples, projects, or case studies that showcase a provider's skills, experience, and past work. It typically includes examples of completed jobs, detailed descriptions of their work, and any relevant achievements or certifications. The portfolio helps potential clients assess the providerʼs capabilities and quality of work before hiring them.`,
      },
      {
        id: 3,
        question: 'How do I contact a service provider before hiring them?',
        answer: `To check a service providerʼs profile before hiring, follow these steps:
          1. Go to My Jobs and click on the dropdown of the job you are hiring for, and view the list of service providers who have applied.
          2. Click on view profile of a service provider you want to check.
          3. On the providerʼs profile, you will find their reviews and ratings from previous clients, along with their portfolio. This info will help you make an informed decision.
          Carefully review the providerʼs profile, ratings, and reviews to ensure they are a good fit for your job.`,
      },
      {
        id: 4,
        question: 'Why do i need to pay before the Job completed?',
        answer: `Payment is required before the service is completed to confirm your booking and
secure the service provider for your request. This process ensures that the service
provider is reserved for your request and that both parties are committed to the
transaction. The payment is held in escrow and only released to the service
provider once you confirm that the service has been completed to your
satisfaction. This system helps protect both parties and facilitates a smooth
transaction`,
      },
      {
        id: 5,
        question: 'How do payments work on ZAAP',
        answer: `Once the job is completed to your satisfaction, you can release the payment to the
service provider through the ZAAP platform. All transactions are securely handled
within the app.`,
      },
      {
        id: 6,
        question: 'Can I cancel a job after booking confirmation?',
        answer: ` Yes, you can cancel a job after booking confirmation, but cancellation charges may
apply based on when you cancel. Please note that no refunds are provided for
cancellations made after the service has started. For detailed information, refer to
our cancellation policy.
`,
      },
      {
        id: 7,
        question: 'How do I leave a review for the service provider?',
        answer: `After the job is completed, youʼll be prompted to leave a review and rating for the
service provider. Your feedback helps in maintaining the quality of the platform and
helps others choose reliable providers.`,
      },
      {
        id: 8,
        question: 'How do I add a tip for a service provider?',
        answer: `After the completion of the work, the app will automatically prompt a tip screen
where you have the option to add a tip for the service provider if you wish to do so.`,
      },
      {
        id: 9,
        question: 'Is tipping mandatory on ZAAP?',
        answer: `Tipping is not mandatory on ZAAP. It is a voluntary way to show appreciation for
exceptional service. If you choose to tip, please note that 100% of the tip amount
will be given directly to the service provider.`,
      },
      {
        id: 10,
        question: 'What should I do if the service provider isnʼt delivering as promised?',
        answer: `If you encounter any issues, try to communicate directly with the service provider
first. If the issue persists, you can reach out to ZAAPʼs support team for further
assistance.`,
      },
    ],
  },
  {
    category: 'Premium Ads',
    questions: [
      {
        id: 1,
        question: 'What are Premium Ads on ZAAP?',
        answer:
          'Premium Ads on ZAAP offer several advantages, including priority placement at the top of relevant search results for better visibility, exclusive visual enhancements like special labels, and boosted reach through active promotion in featured sections and platform recommendations. This leads to higher engagement and responses.',
      },
      {
        id: 2,
        question: 'How many types of Premium Ads does ZAAP offer, and what are they?',
        answer:
          'ZAAP offers two types of Premium Ads: Featured and Spotlight. Featured Ads boost your ad to the top of its specific category, while Spotlight Ads prominently display your ad on the homepage and feature it in a dedicated section for maximum visibility across the platform.',
      },
      {
        id: 3,
        question: 'What is the difference between Featured Ads and Spotlight Ads on ZAAP?',
        answer:
          'Featured Ads enhance visibility within a specific category, ensuring top placement in relevant searches. Spotlight Ads offer broader exposure by featuring your ad on the homepage and in a dedicated section, providing maximum visibility but at a slightly higher cost than Featured Ads.',
      },
      {
        id: 4,
        question: 'How can I choose between Featured Ad and Spotlight Ad Postings for my ad on ZAAP?',
        answer:
          'Consider your visibility needs and budget when choosing between Featured and Spotlight Ads. Featured Ads are ideal for boosting prominence within a specific category, while Spotlight Ads offer maximum exposure on the homepage and a dedicated section for broad visibility.',
      },
      {
        id: 5,
        question: 'How can I purchase Premium Ads for my posting?',
        answer:
          'To purchase Premium Ads, you can either select and purchase them during the ad creation process or choose from available Premium Ads packages in the Premium Ads section of the side menu after logging into your account.',
      },
      {
        id: 6,
        question: 'How many Premium Ads can I buy, and what are the benefits of purchasing a package?',
        answer:
          'You can buy between 1 and 10 Premium Ads at a time. Purchasing ads in a package offers cost savings compared to buying ads individually and provides enhanced visibility for your ads, which can be economical for frequent employers and expedite the hiring process.',
      },
      {
        id: 7,
        question: 'How long will my job or service remain a Premium Ad?',
        answer:
          'Your job or service will remain a Premium Ad until you either hire a service provider or delete your ad. The duration depends on the Premium Ad type and package you selected.',
      },
      {
        id: 8,
        question: 'Can I upgrade an existing Ad to a Premium Ad, and if so, how?',
        answer:
          'Yes, you can upgrade an existing ad to a Premium Ad. Log in to your account, go to "My Jobs," select the ad you wish to upgrade, choose the option to upgrade to a Premium Ad, and select either a Featured or Spotlight Premium Ad. Follow the prompts to complete the payment process.',
      },
      {
        id: 9,
        question: 'How can I apply a Premium Ad I purchased earlier to a new Ad?',
        answer:
          'While creating a new ad, you can apply a Premium Ad from your existing package. Select the option to apply a Premium Ad, choose the type (Featured or Spotlight), and click "Use 1 for this Ad" to apply it from your package.',
      },
      {
        id: 10,
        question: 'Can I cancel a Premium Ad, and if so, will I receive a refund?',
        answer:
          'Premium Ads are non-refundable once purchased. If you need to cancel a Premium Ad, it will be removed from premium status, but no refund will be issued. Please review your purchase carefully before finalizing.',
      },
    ],
  },
  {
    category: 'Background Verification',
    questions: [
      {
        id: 1,
        question: 'How do I register as a service provider on ZAAP?',
        answer:
          'You can register by signing up with your Gmail or Facebook account. After creating your account, click on "Join as a Service Provider" in the side menu and complete the Background Check (BGC) process.',
      },
      {
        id: 2,
        question: 'What is the Background Check (BGC) process?',
        answer:
          'The Background Check (BGC) process is designed to help ensure a safe and trustworthy environment on ZAAP. It involves providing personal details, bank details for depositing your earnings, uploading a government-issued ID, and accepting the terms and conditions.',
      },
      {
        id: 3,
        question: 'What documents do I need to provide during registration?',
        answer:
          'During registration, you need to provide personal details, bank details for depositing your earnings, upload a government-issued ID, and accept the terms and conditions.',
      },
      {
        id: 4,
        question: 'How long does the Background Check (BGC) take?',
        answer:
          'The Background Check (BGC) typically takes a couple of business days to complete. Processing times may vary based on application volume and the accuracy of the information provided. If you haven’t received an update in 48 hours, kindly contact support for a status update.',
      },
      {
        id: 5,
        question: 'Can I track the status of my Background Check (BGC)?',
        answer:
          'Yes, after submitting the Background Check (BGC) form, your profile will display the status as "In Progress," confirming that we have received your information. You will receive an email notification once the BGC process is complete.',
      },
      {
        id: 6,
        question: 'How do I update my information if there’s a mistake in my Background Check (BGC)?',
        answer:
          'To correct any errors in your Background Check (BGC) information, reach out to our support team. They will provide guidance on submitting the correct information and help ensure that your application is processed correctly.',
      },
      {
        id: 7,
        question: 'What should I do if my Background Check (BGC) fails?',
        answer:
          'If your Background Check (BGC) fails, you will receive an email explaining the reasons for the failure. Review the email carefully to understand the issue, make the necessary corrections, and reapply. If no new information or corrections are provided addressing the rejection reasons, your application will not pass the BGC.',
      },
      {
        id: 8,
        question: 'Can I reapply after a failed Background Check (BGC)?',
        answer:
          'Yes, you can reapply after a failed Background Check (BGC). Review the reasons for the failure provided in the email, make the necessary corrections, and submit a new application. If you need guidance, our support team is available to help you through the process.',
      },
      {
        id: 9,
        question: 'What happens after my Background Check (BGC) passes?',
        answer:
          'Once your Background Check (BGC) passes, your account will be upgraded to a service provider account with a verified badge. This verification unlocks several new features, including enhanced options in your side menu.',
      },
      {
        id: 10,
        question: 'Can I start applying for jobs immediately after my Background Check (BGC) is verified?',
        answer:
          'Yes, once your background check is verified, you can start applying for jobs immediately. However, it is recommended to complete your profile by adding a portfolio and including relevant skills to increase your chances of being selected by clients.',
      },
    ],
  },
  {
    category: 'Service Provider Portfolio',
    questions: [
      {
        id: 1,
        question: 'What is a portfolio?',
        answer:
          'A portfolio is a collection of work samples, projects, or case studies that showcases your skills, experience, and expertise. It includes detailed descriptions of past work and any relevant achievements or certifications to help potential clients evaluate your capabilities before hiring.',
      },
      {
        id: 2,
        question: 'How do I add my portfolio to my service provider profile?',
        answer:
          'To add a portfolio to your profile, log in to your account and navigate to the "My Portfolio" section in the side menu. There, you will find an option to upload work samples or project details. Follow the instructions to add and organize your portfolio to effectively showcase your skills and experience.',
      },
      {
        id: 3,
        question: 'What should be included in my portfolio?',
        answer:
          'Your portfolio should include samples of your best work, detailed descriptions of each project, and any relevant achievements or certifications. Focus on showcasing a diverse range of projects that highlight your skills and expertise to attract potential clients.',
      },
      {
        id: 4,
        question: 'Can I edit or delete items in my portfolio?',
        answer:
          'Yes, you can edit or delete items in your portfolio at any time. To do this, go to the "My Account" section and navigate to your portfolio. From there, you can update existing work samples, descriptions, and project details, or remove items that are no longer relevant.',
      },
      {
        id: 5,
        question: 'How large can the images be that I upload to my portfolio?',
        answer:
          'You can upload multiple images to your portfolio, with each image being up to 5MB in size. For larger projects or files, consider uploading them to platforms like Google Drive, Dropbox, or YouTube and then sharing the link in your portfolio.',
      },
      {
        id: 6,
        question: 'Can I include client testimonials in my portfolio?',
        answer:
          'Yes, including client testimonials in your portfolio can enhance its credibility. Positive feedback from previous clients helps build trust and demonstrates the quality of your work and your professionalism.',
      },
      {
        id: 7,
        question: 'What should I do if I don’t have a portfolio?',
        answer:
          'If you don’t have a portfolio, focus on showcasing any relevant experience or skills you possess. Consider completing a few projects or tasks, even on a smaller scale, to build up your portfolio. Additionally, highlight any relevant certifications, training, or skills in your profile to demonstrate your capabilities to potential clients.',
      },
    ],
  },
  {
    category: 'Applying for Jobs',
    questions: [
      {
        id: 1,
        question: 'How do I find jobs on ZAAP?',
        answer:
          'You can find available job listings on ZAAP in several ways: explore using the "Search bar," choose from "Popular categories," pick from "Categories and subcategories," select from the "List of ads" on the homepage, or browse jobs using the "Near Me" functionality.',
      },
      {
        id: 2,
        question: 'What is the "Near Me" functionality on ZAAP?',
        answer:
          'The "Near Me" functionality allows you to find jobs that are geographically close to your location. It helps you connect with local opportunities quickly.',
      },
      {
        id: 3,
        question: 'How do I apply for a job on ZAAP?',
        answer:
          'To apply for a job, select the job listing and thoroughly review the details. If you’re interested, simply click the "Apply" button to submit your application.',
      },
      {
        id: 4,
        question: 'Can I apply for multiple jobs at once?',
        answer:
          'Yes, you can apply for multiple jobs on ZAAP simultaneously. We encourage you to apply for jobs that match your skills and availability. Each application is independent, allowing you to focus on the specific requirements of each opportunity.',
      },
      {
        id: 5,
        question: 'What should I consider when applying for multiple jobs on ZAAP?',
        answer:
          "When applying for multiple jobs, make sure to carefully check each job's schedule to avoid conflicts. Managing your time effectively will help ensure that you can meet deadlines and deliver high-quality work for all your commitments.",
      },
      {
        id: 6,
        question: 'How will I know if my application is successful?',
        answer:
          'You will receive a booking confirmation notification through the ZAAP app if your application is successful. Keep an eye on your notifications and messages for any updates.',
      },
      {
        id: 7,
        question: 'How can I check the status of my job applications on ZAAP?',
        answer: `You can check the status of your job applications in the "My Jobs" section of the app. This section includes: Applied (a list of jobs you have applied for and where you've been selected), and Previous (a list of jobs you have worked on and completed). Each tab provides detailed information about your job applications and their current status.`,
      },
      {
        id: 8,
        question: 'How do I withdraw my application from a job?',
        answer:
          'To withdraw your application from an applied job, head to the "My Jobs" section in the ZAAP app. Click on the "Applied" section to view your list of applied jobs. Select the desired job from the list and click on "Cancel" to withdraw your application. Please note that you cannot withdraw your application once the booking is confirmed and the job has moved to the "Hired" section.',
      },
      {
        id: 9,
        question: 'Can I negotiate job terms before accepting a job?',
        answer:
          'No, all job requirements and terms related to the ad posting are set directly by the customer before the job is posted, and we do not have any role in these terms. Currently, the option to negotiate terms before accepting the job is not available. You may negotiate the terms mutually with the customer after booking confirmation if they are open to negotiation. Ensure any changes are agreed upon directly with the customer before proceeding.',
      },
    ],
  },
  {
    category: 'Managing Jobs',
    questions: [
      {
        id: 1,
        question: 'How do I manage jobs I’ve been hired for?',
        answer:
          'To manage jobs you’ve been hired for, go to the "My Jobs" section in the app and select the "Hired" tab. Here, you can track the progress of each job, communicate with customers, and handle all job-related tasks. This section helps you stay organized and ensures that you complete each job efficiently and on time.',
      },
      {
        id: 2,
        question: 'Can I communicate with the customer after being hired?',
        answer:
          'Yes, after being hired, you can communicate with the customer through the inbuilt chat functionality in the app. This allows you to discuss job details, clarify any requirements, and coordinate effectively to ensure successful job completion.',
      },
      {
        id: 3,
        question: 'How do I start the work after booking confirmation?',
        answer:
          'After booking confirmation, an OTP will be generated and sent to the customer. The customer will provide this OTP directly to the service provider to commence the work. For offline jobs, the OTP will be shared when the service provider arrives at the customer’s location. For online jobs, the OTP will be shared at the start of the work.',
      },
      {
        id: 4,
        question: 'How do I mark a job as completed?',
        answer:
          'To mark a job as completed, after finishing the work, inform the customer to click the "Work Done" button, which will be displayed in the "Work Progress" section of the current job in "My Jobs." Once the customer clicks this, the job will be marked as completed. You can then rate the customer and finalize the job.',
      },
      {
        id: 5,
        question: 'What should I do if I encounter an issue while working on a job?',
        answer:
          'If you encounter an issue while working on a job, first communicate the problem to the customer. If you’re unable to reach a resolution, you can contact ZAAP’s support team for assistance. Provide all relevant details and documentation to help the support team mediate the issue and reach a fair solution.',
      },
      {
        id: 6,
        question: 'Can I cancel a job after accepting it?',
        answer:
          'Cancellation is permitted only for unforeseen events after accepting a job. Frequent cancellations are discouraged and may lead to a temporary suspension of your account. Continued violations may result in permanent termination of your account. If you encounter any issues, please contact our support team right away.',
      },
      {
        id: 7,
        question: 'How can I leave feedback after completing a job?',
        answer:
          'You can leave feedback in the "Work Progress" section of the current job in "My Jobs" after the customer confirms the work is completed. Your feedback helps improve the platform and assists other users in making informed decisions.',
      },
      {
        id: 8,
        question: 'What should I do if I can’t complete a job on time?',
        answer: `If you can’t complete a job on time, immediately inform the customer and explain the situation. Delays can affect your ratings and may lead to penalties if they become frequent. It's important to communicate promptly to manage expectations and find a resolution.`,
      },
      {
        id: 9,
        question: 'What are some best practices for managing jobs?',
        answer:
          'Communicate clearly and promptly with customers, deliver high-quality work, meet deadlines, and maintain professionalism throughout the process.',
      },
    ],
  },
  {
    category: 'Payments',
    questions: [
      {
        id: 1,
        question: 'How long does it take to receive payment after finishing a job?',
        answer:
          'Payments are typically processed within 24 hours after the job is marked as completed. In some cases, it may take up to 48 hours. If you haven’t received your payment after this time, please check the "My Earnings" section of the app for updates.',
      },
      {
        id: 2,
        question: 'How do I get paid for the services I provide?',
        answer:
          'Payments are deposited directly into the bank account details you provided during registration. Ensure your bank information is up-to-date for smooth transactions.',
      },
      {
        id: 3,
        question: 'Where can I check my payment status and history?',
        answer:
          'You can check your payment status and history in the "My Earnings" section of the app. This section provides detailed information on all your payments, including completed transactions and pending payments.',
      },
      {
        id: 4,
        question: 'Are there any fees deducted from my payment?',
        answer:
          'Yes, a small service fee may be deducted from your payment based on the platform’s fee structure. You can view the details of any deductions in the "My Earnings" section of the app. For more information on service fees, please refer to the Platform Fee section.',
      },
      {
        id: 5,
        question: 'How can I update my payment details?',
        answer:
          'To update your payment details, click on "Update Bank Details" in the side navigation under "My Account." From there, you can enter your new payment information and save the changes to ensure your future payments are processed correctly.',
      },
      {
        id: 6,
        question: 'Is there a minimum payout amount on ZAAP?',
        answer:
          'No, there is no minimum payout amount on ZAAP. You will receive payment after completing the work, with the platform fee automatically deducted from your earnings before the payment is processed.',
      },
      {
        id: 7,
        question: 'What should I do if my payment hasn’t been processed within 24 to 48 hours?',
        answer:
          'If your payment hasn’t been processed within 24 to 48 hours after completing a job, please reach out to our support team for prompt assistance and to ensure the issue is resolved quickly.',
      },
      {
        id: 8,
        question: 'How do I update my Government ID?',
        answer:
          'To update your Government ID, click on "Update Government ID" in the side navigation under "My Account." From there, you can upload your new ID and save the changes to ensure your account remains active.',
      },
    ],
  },
];

const ContactUsQuestionsScreen = () => {
  const intialState = {};
  const styles = ContactUsQuestionsStyles();
  const route = useRoute();
  const questionCategory = route.params?.questionCategory;
  const [faqCategory, setFaqCategory] = useState(questionCategory);
  const [collapsedQuestions, setCollapsedQuestions] = useState(1);

  const toggleCollapsable = i => {
    if (collapsedQuestions === i) {
      setCollapsedQuestions(null);
    } else {
      setCollapsedQuestions(i);
    }
  };

  const handleChangeFaqCategory = item => {
    setFaqCategory(item);
  };

  const contactUsButtonList = [
    'Getting Started',
    'Ad Posting',
    'Hiring',
    'Premium Ads',
    'Background Verification',
    'Service Provider Portfolio',
    'Applying for Jobs',
    'Legal',
    'Managing Jobs',
    'Payments',
    'Policies',
  ];

  const renderContactUsButtons = ({item}) => {
    return (
      <CustomButton style={styles.contactUsBtn} onPress={() => handleChangeFaqCategory(item)}>
        <CustomText text={item} style={styles.contactUsBtnText} />
      </CustomButton>
    );
  };

  const showQuestionAccordians = ({item}) => {
    const result = collapsedQuestions === item.id;
    return (
      <View style={styles.questionAndAnswerContainer}>
        <TouchableOpacity onPress={() => toggleCollapsable(item.id)}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionTextStyle}>{item.question}</Text>
            <Icon
              name={!result ? 'plus' : 'minus'}
              size={20}
              color="#000"
              style={{transform: [{rotate: '0deg'}]}}
              onPress={() => toggleCollapsable(item.id)}
            />
          </View>
          <Collapsible collapsed={!result}>
            <CustomText text={item.answer} style={styles.answerTextStyle} />
          </Collapsible>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent text={'Help Center'} />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.frequentlyAskedQuestions}>
            <CustomText text="Frequently Asked Questions" style={styles.title} />
          </View>
          <View style={styles.contactUsButtonListCon}>
            <FlatList
              data={contactUsButtonList}
              renderItem={renderContactUsButtons}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalContactUsBtnFlatList}
            />
          </View>
          <View>
            <CustomText text={faqCategory} style={styles.contactUsQuestionHeading} />
          </View>
          <ScrollView>
            {faqCategory === 'Legal' ? (
              <View style={styles.slaContainer}>
                <LegalScreen />
              </View>
            ) : faqCategory === 'Policies' ? (
              <View style={styles.slaContainer}>
                <PoliciesScreen />
              </View>
            ) : (
              questionsList
                .filter(eachOne => eachOne.category === faqCategory)
                .map(eachOne => (
                  <FlatList
                    data={eachOne.questions}
                    renderItem={showQuestionAccordians}
                    style={styles.questionsContainer}
                    keyExtractor={item => item.id.toString()}
                  />
                ))
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUsQuestionsScreen;
