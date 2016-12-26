import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

// UX
Template.registerHelper('ContributionLearnSubPage', () => Session.get('LearnSubPage').Contribution);
Template.registerHelper('ProtocolLearnSubPage', () => Session.get('LearnSubPage').Protocol);
Template.registerHelper('PortalLearnSubPage', () => Session.get('LearnSubPage').Portal);

Template.registerHelper('BriefAboutSubPage', () => Session.get('AboutSubPage').Brief);
Template.registerHelper('CareersAboutSubPage', () => Session.get('AboutSubPage').Careers);
Template.registerHelper('PurposeAboutSubPage', () => Session.get('AboutSubPage').Purpose);
