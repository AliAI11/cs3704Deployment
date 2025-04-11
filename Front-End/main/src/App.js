/**
 * Misinformation Detector Main UI
 * 
 * Author: Nick Flammer and Mateo Argueta
 * Version: 1.0
 */

import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import { Box, Container} from '@mui/system';
import MenuBar from './GlobalComponents/MenuBar';
import FileUpload from './UploadPageComponents/FileUpload';
import LinkUpload from './UploadPageComponents/LinkUpload';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import TextUpload from './UploadPageComponents/TextUpload';
import Title from './ArticlePageComponents/Title';
import BackButton from './ArticlePageComponents/BackButton';
import About from './ArticlePageComponents/About'; // Import the About component
import DatabasePage from './GlobalComponents/DatabasePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [currentPage, setCurrentPage] = useState('upload'); // Tracks the current page
  const [articleName, setArticleName] = useState(null); // Title or file name of the article
  const [link, setLink] = useState(""); // Link to article
  const [articleText, setArticleText] = useState(""); // Text for analysis
  const [articleFile, setArticleFile] = useState(""); // File path to article
  const [prediction, setPrediction] = useState(""); // Prediction made for if the article is fake news or not

  /*
  0 - author
  1 - genre
  2 - political bias
  More details can still be added
  */
  const [articleAbout, setArticleAbout] = useState([]); // More detail about the article such as the author, genre, etc

  const testArticles = [
    {id: 1, text: "a producer at the women in the world event had an awkward moment on thursday night when he was caught in the spotlight while leading hillary clinton onto the stage the backstage producer could be seen with his hand on clinton s back leading her onto the stage and pointing her in which direction to walk to get to her position hillary gingerly walking across the stage to greet samantha bee  who introduced her  letting out a hearty cackle while successfully negotiating the riser moments later  clinton conquered a single step like a pro before taking a seat ummm sorry samantha bee  but we re not seeing the beyonc connection   american mirror"},
    {id: 2, text: "heze  china      first the news rippled across china that millions of compromised vaccines had been given to children around the country  then came grim rumors and angry complaints from parents that the government had kept them in the dark about the risks since last year  now  the country s immunization program faces a backlash of public distrust that critics say has been magnified by the government s ingrained secrecy  song zhendong  like many parents here  said he was reluctant to risk further vaccinations for his    son   if he can avoid them in the future  we will not get them   said mr  song  a businessman   why didn t we learn about this sooner  if there s a problem with vaccines for our kids  we should be told as soon as the police knew  aren t our children the future of the nation   the faulty vaccines have become the latest lightning rod for widespread  often visceral distrust of china s medical system  and a rebuff to what many chinese critics see as president xi jinping s bulldozing    rule  the scandal is just the latest crisis to shake public faith in china s food and medicine supplies  but it is the first big scare under mr  xi  who had vowed to be different  he came into office promising to  make protecting the people s right to health a priority     if our party can t even handle food safety properly while governing china  and this keeps up  some will wonder whether we re up to the job   mr  xi said in   the year he became president  the anger here in heze  the city in the eastern province of shandong where the scandal has its roots  is evident  about two million improperly stored vaccines were sold around the country from an overheated  dilapidated storeroom  the main suspect in the case is a hospital pharmacist from heze who had been convicted of trading in illegal vaccines in  and was doing it again two years later  many parents said they were especially alarmed that nearly a year had elapsed from the time the police uncovered the illicit trade and the time the public first learned about it in february   withholding information doesn t maintain public credibility   said li shuqing  a lawyer in jinan  the capital of shandong province  who is one of about  attorneys who have volunteered to represent possible victims in the case   in the end  it makes people more distrustful    to many here  the combination of lax regulation and the secrecy surrounding a potential public health crisis seems like déjà vu  in the sars crisis of    people died across mainland china and hundreds more died elsewhere after officials hid the extent of its spread  in a scandal that came to light in   at least six children died and    fell ill with kidney stones and other problems from infant formula adulterated with melamine  an industrial chemical   the customers worry about fake milk powder  fake medicine  fake vaccines  fake everything   said ma guohui  the owner of a shop on the rural fringe of heze that sells baby products   this is certainly going to affect people s thinking  my boy got all his vaccination shots  if he were born now  i d worry    despite such fears  the tainted vaccines are more likely to be ineffective than harmful  the world health organization has said that outdated or poorly stored vaccines rarely if ever trigger illness or toxic reactions  chinese government investigators said last week that they had not found any cases of adverse reactions or spikes in infections linked to ineffective vaccines  the greater danger may be more insidious  the erosion of public trust could damage china s immunization program  which has been credited with significant declines in measles and other communicable diseases   confidence is easy to shake  and that s happened across the world and has happened here   said lance rodewald  a doctor with the world health organization s immunization program in beijing   we hear through social media that parents are worried  and we know that when they re worried  there s a very good chance that they may think it s safer not to vaccinate than to vaccinate  that s when trouble can start    after unfounded reports of deaths caused by a hepatitis b vaccine in   such vaccinations across  provinces fell by  percent in the days afterward  and the administration of other mandatory vaccines fell by  percent  according to chinese health officials  the illicit vaccines in the current case were not part of china s compulsory    vaccination program  which inoculates children against illnesses such as polio and measles at no charge  the illegal trade dealt in     vaccines      including those for rabies  influenza and hepatitis b      which patients pay for from their own pockets  the pharmacist named in the investigation  pang hongwei  bought cheap vaccines from drug companies and traders      apparently batches close to their expiration dates      and sold them in  provinces and cities  according to drug safety investigators  she began the business in   just two years after she had been convicted on charges of illegally trading in vaccines and sentenced to three years in prison  which was reduced to five years  probation  officials have not explained how she was able to avoid prison and resume her business  ms  pang  in her late   and her daughter  who has been identified only by her surname  sun  kept the vaccines in a rented storeroom of a disused factory in jinan  the storeroom lacked refrigeration  which may have damaged the vaccines  potency  the police have detained them but not announced specific charges  and neither suspect has had a chance to respond publicly to the accusations  lax regulation in the   commercial system allowed ms  pang s business to grow  several medical experts said  local government medical agencies and clinics were able to increase their profits by turning to cheap  illegal suppliers  people s daily  the official party paper  reported on tuesday  police investigators discovered ms  pang s storehouse last april  but word did not get out to the public until a shandong news website reported on the case in february of this year  most chinese had still heard nothing about it until another website  the paper  published a report that drew national attention a month later  it was the government s intolerance of public criticism  critics said  that kept the scandal under wraps  a delay that now makes it harder to track those who received the suspect injections   we ve seen with these problem vaccines that without the right to know  without press freedom  the public s right to health can t be assured   said wang shengsheng  one of the lawyers pressing the government for more answers and redress over the case  in the last few weeks  official reticence has been supplanted by daily announcements of arrests  checks and assurances as the central government has scrambled to dampen public anger and alarm  premier li keqiang ordered central ministries and agencies in march to investigate what had gone wrong  last week  the investigators reported that  people had been detained over the scandal  and  officials dismissed  demoted or otherwise punished  health and drug officials promised to tighten vaccine purchase rules to stamp out    trade   how could this trafficking in vaccines outside the rules spread to so many places and go on for so long   mr  li said  according to an official account  without decisive action  he said   ordinary people will vote with their feet and go and buy the products they trust    mr  xi has so far not publicly commented on the scandal  dr  rodewald  the world health organization expert  said the proposed changes were promising and would mean clinics would not have to rely on selling   vaccines for their upkeep  xu huijin  a doctor in heze  said that the concern over the scandal      and unfounded rumors of deaths      had depressed the number of parents bringing children to her clinic for inoculations   this was badly handled   she said   there was a lack of coordination  not enough information  we should have found out about this long ago  doctors are taught to tell patients the full facts"},
    {id: 3, text: "beijing shanghai  reuters    president donald trump can return to the united states claiming to have snagged over   billion in deals from his maiden trip to beijing  whether those deals live up to the lofty price tag is another question altogether  watched by trump and china s president xi jinping at a signing ceremony in beijing  u s  planemaker boeing co  general electric co and chip giant qualcomm inc sealed lucrative multi billion dollar deals   this is truly a miracle   china s commerce minister zhong shan said at a briefing in beijing  the quarter of a trillion dollar haul underscores how trump is keen to be seen to address a trade deficit with the world s second largest economy that he has long railed against and called  shockingly high  on thursday  but u s  businesses still have many long standing concerns to complain about  including unfettered access to the china market  cybersecurity and the growing presence of china s ruling communist party inside foreign firms  william zarit  chairman of the american chamber of commerce in china  said the deals pointed to  a strong  vibrant bilateral economic relationship  between the two countries   yet we still need to focus on leveling the playing field  because u s  companies continue to be disadvantaged doing business in china   u s  tech companies like facebook inc and google are mostly blocked in china  automakers ford motor co and general motors must operate through joint ventures  while hollywood movies face a strict quota system    these deals  allow trump to portray himself as a master dealmaker  while distracting from a lack of progress on structural reforms to the bilateral trade relationship   hugo brennan  asia analyst at risk consultancy verisk maplecroft  said in a note  some huge deals were announced  among them is a  year    billion investment by china energy investment corp in shale gas developments and chemical manufacturing projects in west virginia  a major energy producing state that voted heavily for trump in the  election     the massive size of this energy undertaking and level of collaboration between our two countries is unprecedented   west virginia secretary of commerce h  wood thrasher said in a statement  it marks the first major overseas investment for the newly founded china energy  which formed from the merger of china shenhua group  the country s largest coal producer and china guodian corp  one of china s top five utilities  however  as is often the case during state visits  many of the deals were packaged as  non binding  agreements  gave scant details or rolled over existing tie ups  helping pump up the headline figure   i am somewhat skeptical of such a large number   alex wolf  senior emerging markets economist at aberdeen standard investments  told the reuters global markets forum  adding that the overall tone of the visit so far had been  positive    i suspect they might be primarily mous  memorandum of understandings  instead of actual contracts and the actual contract amount may be substantially less   qualcomm signed non binding agreements worth   billion with xiaomi  oppo and vivo  three chinese handset makers that the firm said it had  longstanding relationships  with  qualcomm already earns more than half of its revenues in china  boeing announced a deal with state run china aviation suppliers holding co to sell  boeing jets with a valuation of   billion at list prices  though analysts said it was unclear how many of these were new orders    interesting to see how many of those are past agreements purchase orders repackaged  beijing is a master of selling the same agreement  times   former mexican ambassador to china jorge guajardo posted on twitter  speaking alongside trump in beijing as they announced the deals  xi said the chinese economy would become increasingly open and transparent to foreign firms  including those from the united states  and welcomed u s  companies to participate in his ambitious  belt and road  infrastructure led initiative  trump made clear he blamed his predecessors  not china  for allowing the u s  trade deficit to get  out of kilter   and repeatedly praised xi  calling him  a very special man    but we will make it fair and it will be tremendous for both of us   trump said   xi smiled widely when trump said he does not blame china for the deficit  asked whether the big package of deals would go some way towards helping fix american trade concerns in china  executives were cautiously optimistic   generally the sense was that this is all a good thing  and that s great   said gentry sayad  a shanghai based lawyer who attended the trade delegation event in beijing    now let s see what really happens and whether or not the agreements signed during this trip can become a basis for a better bilateral trade relationship going forward"},
    {id: 4, text: "it seems only natural that donald trump  the lowest rated president in modern history  should have extremely unpopular policies to match how much americans refuse to support him aside from his disgustingly racist travel ban  there s another policy that americans overwhelmingly despise   the american health care act  also known as trumpcare  while it s been widely known that americans prefer obamacare  the affordable care act  much more than trump s shady  disastrous alternative  the real numbers prove to be worse than originally thought  it turns out  one poll states that over   of americans don t want trump s heath care plan to get anywhere near them and their loved ones this recent poll cited that the american public s support for trumpcare is only    which basically means that trump is screwed if he thinks he can get this health care bill to take the place of obamacare  almost half     of americans stated that they were against trumpcare  with most     responding that they were  strongly  opposed to it so while trump likes to brag about all this  winning  he s doing  we have yet to see it reflect in the american public s opinion of him and his policies  people are passionately resisting trumpcare  and have even taken to gop town halls to openly protest against and condemn gop lawmakers who are trying to help trump take out obamacare trump may not want to admit it  but he s dying in the polls  it s also been reported that only   of americans felt trump was right to fire fbi director james comey  and   of the public wanted the russia investigation to be handed off to an independent commission the more trump tries  the more he fails  as time goes on  we can only expect his approval rating to continue on its downward slope as he makes more horrible decisions for the country featured image is a screenshot"},
    {id: 5, text: "the obama administration is finally taking action after russia interfered in the presidential election  the white house has announced that  intelligence operatives are being ejected from the country  in addition  sanctions will be placed on russia s two leading intelligence services  including four top officers of the military intelligence unit on thursday  obama signed an executive order which grants the president the authority to impose travel bans and asset freezes on those who  tamper with  alter  or cause a misappropriation of information  with a purpose or effect of interfering with or undermining election processes or institutions  the new york times reports mr  obama used that order to immediately impose sanctions on four russian intelligence officials  igor valentinovich korobov  the current chief of a military intelligence agency  the g r u   and three deputies  sergey aleksandrovich gizunov  the deputy chief of the g r u   igor olegovich kostyukov  a first deputy chief  and vladimir stepanovich alekseyev  also a first deputy chief of the g r u the administration also put sanctions on three companies and organizations that it said supported the hacking operations  the special technologies center  a signals intelligence operation in st  petersburg  a firm called zor security that is also known as esage lab  and the autonomous non commercial organization professional association of designers of data processing systems  whose lengthy name  american officials said  was cover for a group that provided special training for the hacking it is unclear at the moment how much of an impact these measures will actually have  the move may end up being largely symbolic  but as the times points out   the actions would amount to the strongest american response ever taken to a state sponsored cyberattack aimed at the united states  u s  intelligence agencies  including the cia  fbi  and department of homeland security  all agree that russia was behind the dnc hacks and the subsequent slow release of damaging information obtained in those hacks during the presidential campaign  they have also concluded that russia interfered with the election for one reason  to help donald trump defeat hillary clinton trump has blown off the findings of the u s  intelligence community as  ridiculous   because the punishments obama imposed today are an executive order  trump will have the option of nixing the sanctions when he takes office next month  if he chooses to do so  it is likely that members of congress  including republicans  will be furious as they have been calling for an official investigation into the matter the white house is also planning to release a joint analytic report  from the fbi and the department of homeland security which will give more insight into the information that has been gathered by the national security agency  the report is expected to be published before obama leaves office in three weeks featured image via chip somodevilla getty images"},
    {id: 6, text: "the main christian diocese in egypt has announced that it will not hold easter celebrations this year  in mourning for the  coptic christians killed in the palm sunday massacre brought about by twin jihadist bombings   the coptic orthodox diocese of minya  located in southern egypt  said tuesday that commemorations of the resurrection of jesus will be limited to the liturgical prayers  without any festive manifestations  out of respect for the faithful who were slain by suicide bombers of the islamic state   the minya province has the highest coptic christian population in the country and christians there traditionally hold easter vigil services on saturday evening and then spend easter sunday on large meals and family visits  christians in minya have lived in constant fear of attacks from the area s large salafi muslim population  in certain local villages  the faithful celebrate mass before a cross drawn on a wall  making it easy to erase quickly in order to avoid attacks  police sources said that  people have been arrested for their possible ties to the planning and financing of sunday s attacks  using dna testing  authorities have also identified the two perpetrators of the slaughter as egyptians who had traveled to syria yet managed to return to egypt  bypassing border controls  the two jihadis carried out separate suicide bombings in the churches of saint george in tanta and saint mark in alexandria while palm sunday services were being conducted  the attacks took the lives of  people  and left more than a hundred wounded  one of the terrorists was identified with the nom de guerre of abu ishaaq al masri  and was reportedly born in  in the province of sharqiya  located in the nile delta north of cairo  he is thought to have entered syria in january of  before authorities lost track of his whereabouts  the bombing in alexandria was reportedly the work of abu     who blew himself up near the doors of the church just as he passed through the metal detector  according to the man s relatives  he had made several trips to neighboring libya  where he would stay for three months at a time  on tuesday  the egyptian parliament unanimously ratified the state of emergency that had been declared the prior evening by the cabinet of ministers of president abdel fattah    the state of alert will be in force for the next three months  at which time it may be renewed if need be  the state of emergency gives the president wide and exceptional powers to establish special courts  intercept communications  impose censorship  or even decree a curfew  human rights activists have expressed fears that the state of emergency will add even more repression to a country where public freedoms have been crushed in the last four years under the pretext of fighting increasingly widespread terrorism  the pew research center reported tuesday that egypt is now the country with the highest level of government restrictions of religion in the entire world  meanwhile  the islamic state has become more and more active in egypt  especially in the region of north sinai  and recently vowed to step up its attacks against egypt s christians  along with the palm sunday attack  isis had claimed responsibility for the december  bombing of a church next to st  mark s cathedral in cairo  an important religious site for egyptian copts  that explosion killed  christians and injured dozens more  follow thomas d  williams on twitter  follow  tdwilliamsrome"},
    {id: 7, text: "mccarthyism has returned donald trump is literally letting a white nationalist publication dictate personnel decisions in his administration sahar nowrouzzadeh is an american citizen of iranian descent  she is an expert on iran and has played a crucial role in shaping u s  policy in the middle east  she was born in america  first served at the state department under the george w  bush administration in  and was on the team that negotiated the iran nuclear deal under president obama but because she is of iranian descent  breitbart and other conservative outlets believe she is in league with iranian leadership against the united states  seriously according to politico nowrouzzadehad had been detailed since last july to the secretary of state s policy planning team  where she handled ongoing issues related to iran and gulf arab countries  her yearlong assignment was cut short earlier this month  after critical stories about her and others appeared in the conservative review and on breitbart news  according to the state department official  who spoke on condition of anonymity because he was not authorized to discuss the matter  nowrouzzadeh did not want to be reassigned  according to the official indeed  being reassigned is basically a demotion and one based on racism and fear instead of one based on her job performance nowrouzzadeh will now be working in the office of iranian affairs despite the state department praising her work as  valuable in furtherance of u s  national security  nowrouzzadeh is the kind of state department employee america needs right now as tensions between iran and the united states remain strained because trump and his republican allies have repeatedly threatened to trash the nuclear deal former state department official phillip gordon slammed the trump administration for caving to pressure from conservative media  like many civil service experts and career foreign service officers  she possesses just the sort of expertise political leaders from either party should have by their side when they make critical and difficult foreign policy decisions   gordon said the bottom line is that this smacks of mccarthyism from the right wing just as it did when joe mccarthy led a witch hunt against government employees in pursuit of alleged communists only this time  conservatives are targeting anyone who has a name that sounds middle eastern or muslim breitbart should not have the power to affect personnel decisions at the state department and donald trump should not listen to them  doing so only makes us weaker because the experts we need on the front lines are being persecuted or living in fear of being persecuted it also makes america less safe because this demotion will be used as an example of how the current united states government treats people of middle eastern descent in order to recruit terrorists sahar nowrouzzadeh already swore an oath to defend the united states constitution when she was hired by the state department in   it s the same oath that members of congress swear when they enter office  questioning her loyalty based on the color of her skin or her birth name is wrong and constitutes discrimination  frankly  she should file a lawsuit against trump featured image  olivier douliery pool getty images"},
    {id: 8, text: "the republican party is tearing at the seams due to donald trump s frontrunner status for the party s presidential nomination  thousands of republicans will either refuse to vote for him or vote for democrats to keep donald trump from taking over their party and ultimately the oval office  but mr  trump s campaign  along with senator ted cruz who is also despised by many of his republican colleagues and supporters of the party  have pulled republicans far to the right  leaving moderate republicans with nowhere to turn but the democratic party republicans currently have a majority in both the house and the senate  congress has been in gridlock since they took over  the gop majority has consistently refused to do their jobs  they are more focused on obstructing president obama than working with democrats to solve the pressing problems facing our nation  this november  those do nothing republicans will pay the price by losing elections across the country  in addition to the presidential election republicans love to do nothing  so the democrats will help them achieve those ambitions of doing nothing by no longer allowing them to be employed in congress  despite the pressing and timely concerns posed by the threat of climate change  republicans refuse to acknowledge its existence and do nothing  when religious nutjob kim davis refused to do her job as a county clerk charged with issuing marriage licenses in kentucky  republicans applauded her propensity for not doing her job  when paul ryan became speaker of the house  republicans forced him to promise to not do anything on immigration reform  and bow to the party leaders  wishes for congress to continue to do nothing better than before despite mass shootings occurring all over the country on a regular basis  the republican party has refused to take any action on gun control or mental health issues   every meaningful proposal or reform that is introduced into songress is met with staunch resistance from the republican party  who refuses to act to help solve or mitigate any of the issues facing the country  with the republican majority gone  democrats can finally start solving some of the country s problems featured image via flickr"},
    {id: 9, text: "century wire says if you have only recently joined us as a subscriber and member at  tv let me take this opportunity to say thank you for coming on board   your support is helping us to continue building and improving this independent media operation see our members newsletter   global report heresupport our work by subscribing and becoming a member   tv"},
    {id: 10, text: "lifeline  is a   thriller directed by an academy award winner about a man s search for his missing girlfriend  in the film  set in shanghai with a plot driven by corporate malfeasance  punches are thrown  shots are fired and people are killed  at one point  the actress olivia munn stands over a dead woman  blood on her hands  but this is no ordinary movie  it is an online advertisement for the mobile technology company qualcomm and  in particular  its snapdragon  chip set  a smartphone processor  as more people skip or block ads when streaming shows or browsing websites  advertisers are trying to find new ways to deliver their messages  the internet has long been a place where companies have tried to break out of the   and   ad model  but as it has become easier to present   videos online      and as top directors and actors have shown a willingness to be involved      these efforts have become more sophisticated  the goal of  lifeline  and similar ads is  to make something you want to see      and the holy grail is if people seek you out   said teddy lynn  chief creative officer for content and social at ogilvy  mather  which produced the film   this is a piece of entertainment that can compete in a very crowded marketplace     lifeline  was released in may and pushed out on multiple social media channels in the united states and china   inside lifeline   a      look at the film  is also available on the  lifeline  website  it emphasizes the importance of the cellphone to the action in the film and the phone s various features the film hopes to highlight  like its long battery life and improved photo capability  in many ways   lifeline  is just an extension of product placement and show sponsorship by advertisers that goes back to the early days of radio and television  said lou aversano  chief executive of ogilvy  mather ny   i think we continue to push  not just in terms of length  but in terms of the line between entertainment and brand message   he said  many companies are looking for ways to promote their brand through longer storytelling  such as johnnie walker  nike and prada  it is an impulse that dates to at least  or   when a series of eight   films for bmw starring clive owen appeared online   that was at the time the internet was still   said steve golin  founder and chief executive of anonymous content  a multimedia development company that produced the bmw ads and  lifeline     it would take all night to download     lifeline   which stars ms  munn  leehom wang and joan chen  is directed by armando bo  who won an oscar for best original screenplay for  birdman  in   the film has attracted  million views  there have been an additional  million combined views of the film s trailers and the    video  mr  lynn said  eighty percent of the views came from china  which was the primary market  the dialogue is  percent in chinese and  percent in english  mr  lynn said qualcomm would not disclose the cost of the ad  but noted that with less money needed to buy time on television  more was available for the production   you can create content that is compelling and you don t have to spend money to place it on tv   said mr  golin  whose company has been involved with movies like  spotlight  and  the revenant  and tv shows like  mr  robot     we think this is the direction advertising is headed  as long as sports exists  we will still do   and   commercials  but with most other entertainment there is a lot of resistance to watching    advertising    mark crispin miller  a professor of media studies at new york university  said the disappearing boundaries between advertising and entertainment could be troubling  ads  by their nature  often exaggerate  the benefits or virtues of the products and  even more troubling  downplay the dangers or risk of a product   mr  miller said  and using big stars  makes the commercial intent even harder to perceive and blurs the true purpose behind the work    still  more advertisers are eager to experiment  take  the ballad of the dreadnought   a   documentary about the distinctive guitar body originally manufactured by c  f  martin  company  it is narrated by jeff daniels and includes interviews with musicians like rosanne cash  stephen stills and steve miller  the film appears solely on martin s website  but was selected to appear at several film festivals  it has received    views since it first streamed on may   said scott byers  a managing partner at lehigh mining  navigation  the advertising agency that developed the film  the documentary idea developed  mr  byers said  when martin came to his agency wanting to celebrate the dreadnought guitar  which was developed in the early  century but never trademarked  enabling many other manufacturers to copy it over the years   they asked   what can we do to reclaim ownership of the shape     said denis aumiller  also a managing partner at the agency   the initial thought was that we would produce a short    product video  or maybe a magazine article    as enticing as it may be to think of every commercial as a potential short film that could play on the festival circuit  creating something that attracts viewers and promotes a product is not easy  entertainment  after all  is not the ultimate goal   at some point   mr  aversano said   there s a responsibility to deliver the message of the brand  otherwise it s just empty calories"}
  ]

  const handlePrediction = async () => {
    try {
      const res = await axios.post(`http://127.0.0.1:5000/predict`, {articleText});
      setPrediction(res.data.result);
      
      // Store the article in the database
      await axios.post('http://127.0.0.1:5000/store_article', {
        title: articleName || 'Untitled',
        content: articleText,
        prediction: res.data.result.prediction,
        source_type: articleFile ? 'file' : (link ? 'link' : 'text'),
        source_value: articleFile || link || 'user_input'
      });
    } catch (error) {
      console.error("Error fetching prediction result:", error);
    }
  };

  const handleTextExtraction = async () => {
    try {
      const res = await axios.post(`http://127.0.0.1:5000/link`, {link});
      setArticleText(res.data.output);
      if (res.data.title) {
        setArticleName(res.data.title);
      }
      return res.data.output;
    } catch (error) {
      console.log("Error fetching text from link:", error);
      return "";
    }
  };

  

  // Handle link upload
  const handleLinkUpload = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/scrape_and_store', { link });
      if (res.data.error) {
        console.error("Error:", res.data.error);
        return;
      }
      
      // Update the UI with the scraped data
      setArticleName(res.data.title);
      setArticleText(res.data.content);
      setPrediction(res.data.prediction);
      setCurrentPage('about');
    } catch (error) {
      console.error("Error scraping and storing article:", error);
    }
  };

  // Handle text upload
  const handleTextUpload = () => {
    setArticleName("User Input");
    setCurrentPage('about'); // Switch to the About page
    handlePrediction();
  };

  const handleTextSelect = (e) => {
    setArticleName("Article " + e.target.value.id);
    setArticleText(e.target.value.text);
  };

  const handleSelectButton = () => {
    setCurrentPage('about');
    handlePrediction();
  }

  // Reset and go back to the upload page
  const handleBack = () => {
    setCurrentPage('upload');
    setArticleName(null);
    setLink("");
    setArticleText("");
    setPrediction("");
  };

  return (
    <Router>
      <Container
        className="App"
        maxWidth={false}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <MenuBar />
        <Routes>
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/" element={
            currentPage === 'upload' ? (
              <Box
                marginTop='30px'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '75%',
                  border: 1,
                  borderRadius: 4,
                  padding: '25px'
                }}
              >
                <LinkUpload handleLinkSetting={setLink} handleLinkUpload={handleLinkUpload} />
                <Typography variant="h6">Or</Typography>
                <TextUpload
                  handleTextSetting={setArticleText} 
                  handleSubmitText={handleTextUpload} 
                />
                <Typography variant="h6">Or</Typography>
                <FormControl sx={{width: '75%'}}>
                  <InputLabel id="article-select-label">Select an Article</InputLabel>
                  <Select
                    labelId="article-select-label"
                    value={articleText}
                    label="Select an article"
                    onChange={handleTextSelect}
                  >
                    {testArticles.map((article) => (
                      <MenuItem value={article}>
                        {"Article " + article.id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  onClick={handleSelectButton}
                  variant='contained'
                >
                  Submit
                </Button>
              </Box>
            ) : (
              <div>
                <Box
                  marginTop='30px'
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <BackButton onClick={handleBack} />
                  <Title
                    articleName={articleName}
                    link={link}
                  />
                </Box>
                <Box
                  marginTop='20px'
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <About
                    articleText={articleText}
                    articleFile={articleFile}
                    articleAbout={articleAbout}
                    prediction={prediction}
                  />
                </Box>
              </div>
            )
          } />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;