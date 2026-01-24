/**
 * Comprehensive IFS Inner Child Healing Curriculum
 * Professional-grade therapeutic content with extensive materials
 * Fully functional interactive activities and exercises
 */

// Core interfaces for the learning system
export const CurriculumSection = {
  id: '',
  title: '',
  content: [],
  bullets: [],
  keyTakeaways: [],
  reflectionPrompts: []
};

export const CurriculumActivity = {
  id: '',
  title: '',
  description: '',
  type: 'reflection',
  prompt: '',
  questions: [],
  guidedSteps: [],
  interactiveElements: []
};

export const CurriculumResult = {
  id: '',
  title: '',
  description: '',
  completionMessage: '',
  nextSteps: [],
  achievement: ''
};

export const CurriculumModule = {
  id: '',
  order: 0,
  title: '',
  description: '',
  category: 'introduction',
  estimatedMinutes: 0,
  prerequisites: [],
  steps: [],
  innerChildFocus: false
};

// Comprehensive curriculum modules with extensive content
export const curriculumModules = [
  {
    id: 'module-1-intro-ifs',
    order: 1,
    title: 'Module 1: Foundations of IFS & Your Inner Child',
    description: 'Deep dive into Internal Family Systems theory and discover your Inner Child parts through comprehensive exploration and practical applications',
    category: 'introduction',
    estimatedMinutes: 45,
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-what-is-ifs',
          title: 'Understanding Internal Family Systems',
          content: [
            'Internal Family Systems (IFS), developed by Dr. Richard Schwartz, represents a revolutionary approach to psychological healing that recognizes the natural multiplicity of the human mind. Unlike traditional models that pathologize internal conflict, IFS embraces the reality that we all contain multiple subpersonalities or "parts" – each with valuable qualities, perspectives, and protective intentions.',
            'At the core of this sophisticated internal system lies your Self – the natural, compassionate leader who embodies the 8 C\'s: Curiosity, Compassion, Calm, Clarity, Confidence, Courage, Creativity, and Connectedness. Your Self is not something you need to develop or achieve; it\'s your essential nature that emerges when parts step back and allow you to lead.',
            'Your Inner Child parts represent the most vulnerable, authentic aspects of your being – carrying the emotions, beliefs, and memories from your formative years. These young parts hold your innate capacity for joy, wonder, creativity, and spontaneity, but they also carry the wounds and burdens from overwhelming experiences when they lacked the resources to process difficult emotions.',
            'The IFS model reveals that psychological symptoms, relationship patterns, and life struggles are not signs of brokenness but rather intelligent protective strategies developed by your parts. Your "symptoms" are actually desperate attempts by younger parts to get your attention and by protective parts to keep you safe from overwhelming pain.',
            'What makes IFS uniquely effective for Inner Child healing is its non-pathologizing approach. Instead of trying to eliminate or control parts, IFS invites you to build compassionate relationships with them. Your Inner Child parts are not problems to be solved – they are precious family members who have been carrying heavy burdens and are desperately waiting for a wise, loving parent (your Self) to help them heal.',
            'The beauty of IFS lies in its recognition that every part, even those causing the most difficulties, has a positive intention and extreme loyalty to you. Your protective parts developed their strategies during childhood when they were genuinely necessary for survival. These parts need your understanding and appreciation, not elimination.',
            'This model also explains why traditional talk therapy often has limited success with deep wounds. When you try to "fix" your issues from a purely analytical perspective, you\'re often working from a protective Manager part rather than your Self. True healing requires accessing your Self energy and building direct relationships with the young parts who hold the pain.',
            'IFS provides a comprehensive map of your internal world that honors the complexity and wisdom of your psyche. It gives you language and tools to understand your internal dynamics, build trust with your parts, and create the safety necessary for profound transformation and healing.',
            'Your journey through IFS will involve learning to distinguish between Self and parts, building trust with your protective system, accessing and healing wounded Inner Child parts, and ultimately integrating all aspects of yourself into a harmonious internal family led by compassionate Self leadership.'
          ],
          bullets: [
            'Your mind naturally contains multiple parts – this is normal and healthy, not a disorder',
            'Each part, including your Inner Child, has valuable qualities and positive intentions',
            'Your Self is your core essence – naturally compassionate, wise, and capable of healing',
            'IFS works with all parts collaboratively rather than trying to eliminate or control them',
            'Inner Child wounds are carried by vulnerable young parts who need your loving attention',
            'Protective patterns were originally smart survival strategies developed in childhood',
            'Healing happens through building relationships, not through internal warfare',
            'Your internal family can learn to work together harmoniously under Self leadership'
          ],
          keyTakeaways: [
            'Your multiplicity is your greatest strength when understood and harmonized',
            'Your Inner Child parts carry both your deepest wounds and your innate capacity for joy',
            'Self-leadership is your natural state when parts trust you enough to step back',
            'IFS provides both theoretical understanding and practical tools for deep healing',
            'All parts deserve compassion and understanding, especially those causing problems',
            'Your protective system needs reassurance that your Self can handle emotional intensity',
            'Internal harmony is achievable through relationship-building, not control',
            'Your journey involves becoming the loving parent your Inner Child always needed'
          ],
          reflectionPrompts: [
            'When you consider that different parts of you might have different perspectives, what emotions or thoughts arise? Curiosity? Skepticism? Relief?',
            'Reflect on moments when you\'ve felt particularly young, vulnerable, or reactive – what might your Inner Child parts have been trying to communicate in those moments?',
            'Consider times when you\'ve felt internally conflicted – how might understanding your internal family change how you view those experiences?',
            'What are your initial reactions to the idea that problematic behaviors might be protective strategies with positive intentions?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-meet-inner-family',
          title: 'Meeting Your Internal Family',
          description: 'Begin to recognize and communicate with the different aspects of yourself in a compassionate, curious way',
          type: 'reflection',
          prompt: 'This gentle exercise invites you to start building awareness of your internal family. Choose a recent situation where you felt conflicted, overwhelmed, or noticed different internal reactions. This is your opportunity to begin meeting your parts with the curiosity and compassion of Self.',
          questions: [
            'Describe the situation in detail: What was happening externally? Who was involved? What was at stake for you?',
            'Notice and describe the different thoughts, feelings, impulses, or sensations that arose. Try to identify at least 3-4 distinct internal reactions.',
            'Give each reaction a descriptive name (like "The Worrier," "The Angry One," "The Peacemaker," "The Scared Child"). What does each seem to want?',
            'Which of these reactions might be coming from your Inner Child parts? Which feel like protective adults?',
            'Looking back, can you sense which perspective felt most like your calm, wise Self? What did that feel like in your body?',
            'What might your Inner Child parts have needed in that moment that they didn\'t receive?',
            'How might you respond differently next time if you could lead with Self-energy?',
            'What appreciation do you have for how these parts were trying to help you, even if their methods weren\'t ideal?'
          ],
          interactiveElements: [
            'multi-select-perspectives',
            'emotion-spectrum',
            'age-identification',
            'self-energy-meter'
          ]
        }
      },
      {
        type: 'learn',
        data: {
          id: 'learn-self-energy',
          title: 'Accessing Your Self Energy',
          content: [
            'Self energy is your natural state of being – the compassionate, confident, wise core that exists beneath the noise of protective parts and wounded Inner Child pain. It\'s not something you need to develop or achieve; it\'s who you naturally are when parts step back and allow you to emerge.',
            'The 8 C\'s of Self – Curiosity, Compassion, Calm, Clarity, Confidence, Courage, Creativity, and Connectedness – are qualities that naturally arise when you\'re in Self. These aren\'t virtues to cultivate but rather indicators that you\'re accessing your true nature.',
            'Curiosity in Self feels open and non-judgmental. Instead of asking "Why do I keep doing this?", which comes from a critical Manager part, Self asks "What is this part trying to accomplish? What does it need?" This openness creates immediate safety for parts to share their truth.',
            'Compassion flows naturally when you see parts as vulnerable family members doing their best with the tools they have. Self-compassion extends this same understanding to yourself, recognizing that you\'ve been doing the best you can with the internal resources available.',
            'Calm in Self isn\'t the absence of emotion but rather the capacity to be with intense feelings without being overwhelmed. It\'s the feeling of a wise parent holding a crying child – fully present with the emotion while maintaining centered presence.',
            'Clarity comes when you\'re not merged with parts\' extreme beliefs or emotions. You can see situations as they are, understand multiple perspectives, and access wisdom that isn\'t available when you\'re in protective or wounded states.',
            'Confidence emerges from knowing you can handle whatever arises in your internal system. It\'s not arrogance but rather a deep trust in your capacity to be with pain, navigate conflict, and provide the leadership your parts need.',
            'Courage in Self allows you to face difficult emotions, memories, and truths without turning away. It\'s the willingness to sit with your Inner Child\'s pain, to listen to your protectors\' fears, and to stay present when parts want to numb or escape.',
            'Creativity flows naturally from Self, helping you find new solutions to old problems and new ways of relating to your parts. When protective strategies aren\'t working, Self-energy can discover innovative approaches that honor all parts.',
            'Connectedness reminds you that all parts belong to you and deserve love and inclusion. It\'s the felt sense of internal family harmony and the recognition that you\'re whole exactly as you are, even as you continue to heal and grow.',
            'Accessing Self energy becomes easier with practice. Start with moments when you feel relatively calm and expanded, then gradually build capacity to stay in Self during more challenging internal experiences. Your parts are watching and learning to trust your leadership.',
            'Your Inner Child parts especially need your Self energy – they need the calm, wise, loving parent they may not have had in childhood. When your Self leads, your Inner Child can finally release burdens it\'s carried for years.'
          ],
          bullets: [
            'Self energy is your natural state, not something to achieve or develop',
            'The 8 C\'s are indicators that you\'re in Self, not goals to accomplish',
            'Each C serves a specific function in relating to different types of parts',
            'Self energy creates immediate safety for wounded Inner Child parts',
            'Your protectors learn to trust Self through consistent compassionate leadership',
            'Accessing Self becomes easier with practice and positive experiences',
            'Self can be present with intense emotions without being overwhelmed',
            'Your Inner Child is especially responsive to Self energy and leadership'
          ],
          keyTakeaways: [
            'Self energy is already within you – it\'s about accessing, not building',
            'The 8 C\'s work together to create confident, compassionate leadership',
            'Your Inner Child parts have been waiting for Self leadership their whole lives',
            'Self energy provides the safety needed for deep Inner Child healing',
            'Practice noticing when you\'re in Self vs. when parts have taken over',
            'Your protectors will relax as they learn to trust Self leadership',
            'Self energy is the key to transforming all internal relationships',
            'You can cultivate Self energy through simple awareness and compassion practices'
          ],
          reflectionPrompts: [
            'Which of the 8 C\'s feels most natural to you? Which feels most challenging to access?',
            'When have you noticed yourself naturally in Self-energy? What helped that happen?',
            'What parts seem most active when you try to access Self? What are they afraid of?',
            'How might your daily life change if you led more often from Self energy?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-cultivate-self',
          title: 'Cultivating Self Energy Practice',
          description: 'Develop your capacity to access and strengthen Self energy through guided meditation and practical exercises',
          type: 'meditation',
          prompt: 'This meditation practice will help you access your natural Self energy and strengthen the qualities that allow you to lead your internal system with confidence and compassion. Find a comfortable, quiet space where you won\'t be disturbed for 15-20 minutes.',
          guidedSteps: [
            'Begin by finding a comfortable position, either sitting upright in a chair or lying down. Allow your body to settle and feel supported.',
            'Take three deep, conscious breaths. Inhale slowly through your nose, feeling your belly expand. Exhale slowly through your mouth, releasing tension.',
            'Bring awareness to your physical body. Notice any areas of tension, discomfort, or ease. Simply observe without trying to change anything.',
            'Invite Curiosity about your present experience. Without judgment, notice what you\'re feeling, thinking, and sensing in this moment.',
            'Place a hand over your heart center. Allow Compassion to arise for whatever is present – for your parts, your Inner Child, and yourself.',
            'Feel Calm presence emerging, like a wise parent sitting with upset children. You have the capacity to be with whatever arises.',
            'Access Clarity by seeing your experience without being completely merged with it. There\'s the part of you that\'s observing, and there\'s what\'s being observed.',
            'Connect with Confidence in your ability to be with your parts and help them heal. You have the wisdom and resources needed.',
            'Feel Courage to face whatever emotions or memories may arise. You can handle intensity with grace and strength.',
            'Invite Creativity to find new ways of relating to your internal experience. Fresh perspectives and solutions are available.',
            'Experience Connectedness – knowing all parts belong to you and your internal family. You are whole and complete.',
            'Take a moment to appreciate your Self for being here, ready to lead with love and wisdom.',
            'When you feel complete, gently return to full awareness, carrying this Self energy with you into your day.',
            'Set an intention to check in with your Self energy throughout the day, especially during challenging moments.'
          ],
          interactiveElements: [
            'guided-meditation',
            'self-energy-meter',
            'quality-reflection',
            'daily-practice-planner'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-foundations-complete',
          title: 'IFS Foundations Mastered',
          description: 'You\'ve established a solid understanding of IFS and begun building relationship with your internal family',
          completionMessage: 'Congratulations! You\'ve built a strong foundation in IFS theory and practice. You now understand that your multiplicity is natural and healthy, that your Self is the wise leader your parts have been waiting for, and that your Inner Child parts carry both wounds and precious gifts. This foundation will support all your future healing work.',
          nextSteps: [
            'Practice brief Self-energy check-ins throughout your day, especially during stressful moments',
            'Continue noticing when different parts activate and approach them with curiosity rather than judgment',
            'Start identifying your Inner Child parts and the burdens they may be carrying',
            'Prepare to explore specific Inner Child wounds in Module 2',
            'Consider keeping a journal of your internal experiences to track patterns and insights',
            'Practice appreciation for your parts\' efforts, even when their strategies aren\'t ideal'
          ],
          achievement: 'Internal Family Systems Foundation Builder'
        }
      }
    ]
  },
  {
    id: 'module-2-inner-child-wounds',
    order: 2,
    title: 'Module 2: Deep Dive into Inner Child Wounds',
    description: 'Comprehensive exploration of childhood wounds, their formation, impact on adult life, and pathways to healing',
    category: 'parts_system',
    estimatedMinutes: 60,
    prerequisites: ['module-1-intro-ifs'],
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-wound-formation',
          title: 'How Inner Child Wounds Form and Impact Adult Life',
          content: [
            'Inner Child wounds are not character flaws or signs of weakness – they are natural, understandable responses to overwhelming childhood experiences when you lacked the developmental capacity, support, and resources to process them fully. These wounds become burdens that your young, vulnerable parts (exiles) continue to carry decades later, influencing every aspect of your adult life.',
            'The formation of wounds happens during critical developmental windows when children are naturally dependent, impressionable, and lacking in perspective. A single rejection incident at age 7 can create a lifetime of relationship patterns. A moment of abandonment at age 4 can shape decades of trust issues. This isn\'t about being overly sensitive – it\'s about the natural vulnerability of being a child.',
            'Core childhood wounds include rejection (feeling unwanted or unlovable), abandonment (fear of being left alone), neglect (not having basic needs met), criticism/shame (believing something is fundamentally wrong with you), betrayal (trust being broken by those who should protect you), humiliation (deep embarrassment that shaped self-concept), injustice (fairness violations that created bitterness), loss/grief (unprocessed death or separation trauma), emotional invalidation (being told your feelings are wrong), and various forms of abuse (physical, emotional, sexual).',
            'Each wound type creates specific limiting beliefs about yourself, others, and the world. A rejection wound might generate beliefs like "I\'m unlovable," "I must hide my true self to be accepted," or "I\'ll always be left behind." An abandonment wound might create "People always leave," "I can\'t trust anyone to stay," or "I must be self-sufficient to survive." These beliefs weren\'t true when they formed and they\'re not true now – but they feel absolutely real to the young parts carrying them.',
            'The impact of these wounds in adult life is profound and often unconscious. You might find yourself in relationship patterns that recreate childhood dynamics, career choices that compensate for perceived inadequacies, social behaviors that avoid triggering old wounds, or emotional reactions that seem disproportionate to current situations. Your Inner Child parts are essentially recreating opportunities to heal the original wounds, hoping for a different outcome this time.',
            'Your protective parts work tirelessly to prevent these wounds from being triggered. The Perfectionist Manager might say "If I\'m flawless, no one can criticize me" (protecting a shame wound). The People-Pleasing Manager might think "If I make everyone happy, they won\'t reject me" (protecting a rejection wound). The Controller Manager might believe "If I manage everything, nothing bad will happen" (protecting an abandonment wound). These strategies were smart survival adaptations, even if they limit your adult life.',
            'The challenge is that protective strategies often create the very outcomes they\'re trying to prevent. Perfectionism can lead to burnout and criticism from others. People-pleasing can result in resentment and eventual relationship breakdown. Control can create distance and push people away. Your protective parts are caught in impossible situations, trying to prevent old pain with strategies that don\'t work in adult contexts.',
            'Healing Inner Child wounds requires understanding their origins, validating the young parts\' experiences, helping them release the burdens they carry, and providing the loving corrective experiences they needed but didn\'t receive. This isn\'t about blaming parents or staying stuck in the past – it\'s about giving your young parts what they need now: safety, validation, love, and wise leadership.',
            'Your Adult Self has the capacity to provide everything your Inner Child needed: unconditional love, emotional validation, protection, guidance, and the wisdom to help them understand that childhood experiences weren\'t their fault. As you build this relationship, your young parts can finally release burdens they\'ve carried for decades.',
            'The healing journey involves compassionately understanding your wounds, building trust with protective parts, accessing wounded young parts with Self energy, facilitating unburdening (release of toxic beliefs and emotions), and integrating healed parts into your internal family. This creates profound transformation not just in individual symptoms but in your entire experience of life.',
            'Understanding your specific wound patterns is crucial for targeted healing. Each wound type requires different approaches and different types of corrective experiences. Rejection wounds need experiences of unconditional acceptance. Abandonment wounds need consistent presence and reliability. Shame wounds need validation and non-judgment. Your Self can provide all of these.',
            'Your Inner Child wounds are not your identity – they\'re burdens your young parts absorbed during overwhelming moments. As you heal these wounds, your authentic qualities naturally emerge: joy, creativity, spontaneity, confidence, and the capacity for deep, authentic connection with others.'
          ],
          bullets: [
            'Inner Child wounds are natural responses to overwhelming childhood experiences',
            'Wounds form during critical developmental windows when children are most vulnerable',
            'Each wound type creates specific limiting beliefs that still affect your adult life',
            'Protective patterns were originally smart survival strategies based on childhood experiences',
            'Current adult problems often recreate childhood wound dynamics unconsciously',
            'Your protective parts are desperately trying to prevent old pain from resurfacing',
            'Healing requires providing what your Inner Child needed but didn\'t receive',
            'Your Adult Self has the capacity to provide complete healing and corrective experiences'
          ],
          keyTakeaways: [
            'Your Inner Child parts are carrying pain, not pathology – their responses were completely understandable',
            'The burdens they carry are beliefs about unworthiness, not objective truth about who you are',
            'Your protective patterns were intelligent adaptations that kept you safe as a child',
            'Healing involves building relationship, not forcing change or trying to eliminate parts',
            'Your Self can provide the exact experiences your Inner Child needed for healthy development',
            'Understanding specific wound patterns allows for targeted, effective healing approaches',
            'Your wounded Inner Child parts are waiting for the loving parent they always needed',
            'As wounds heal, your natural qualities of joy, creativity, and authenticity naturally emerge'
          ],
          reflectionPrompts: [
            'What patterns in your adult relationships, career, or emotional life might be connected to childhood experiences?',
            'When do you notice yourself reacting like a younger version of yourself? What triggers these reactions?',
            'What protective strategies do you use that might be preventing specific types of pain or rejection?',
            'If your Inner Child parts could tell you what they need most from you, what do you think they would say?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-comprehensive-wound-assessment',
          title: 'Comprehensive Inner Child Wound Assessment',
          description: 'Deep exploration of your specific wound patterns with detailed analysis and healing pathway identification',
          type: 'parts_work',
          prompt: 'This comprehensive assessment will help you identify the specific wounds your Inner Child parts may be carrying, understand how these wounds affect your adult life, and recognize your protective patterns. Approach this exploration with gentle curiosity and compassion for your younger self. If any area feels too intense, you can pause and return when you feel more resourced.',
          questions: [
            'WOUND IDENTIFICATION: Which of these common wounds resonate with your experience? Rate each from 0-5 (0=no resonance, 5=strong resonance)',
            'REJECTION: "I\'m unlovable/unwanted" - Have you experienced: feeling excluded from groups, romantic rejections, family not understanding you, feeling like you don\'t belong anywhere?',
            'ABANDONMENT: "People always leave" - Have you experienced: divorce/death of parents, being left at daycare/school, friends moving away, partners ending relationships unexpectedly?',
            'NEGLECT: "My needs don\'t matter" - Have you experienced: emotional unavailability from caregivers, lack of praise/encouragement, not being fed/clothed properly, being left alone too much?',
            'CRITICISM/SHAME: "Something is wrong with me" - Have you experienced: harsh criticism about appearance/intelligence, being compared unfavorably to others, being made to feel defective or broken?',
            'BETRAYAL: "I can\'t trust anyone" - Have you experienced: parents cheating/divorcing, friends breaking trust, people lying to you, promises being repeatedly broken?',
            'HUMILIATION: "I\'m deeply embarrassed" - Have you experienced: being shamed in public, punished in front of others, having secrets exposed, being laughed at for vulnerability?',
            'INJUSTICE: "Life isn\'t fair" - Have you experienced: sibling favoritism, being blamed unfairly, not being heard/believed, rules applying differently to you?',
            'LOSS/GRIEF: "I\'m alone with this pain" - Have you experienced: death of loved ones, moving frequently, pet loss, divorce, unprocessed goodbyes?',
            'EMOTIONAL INVALIDATION: "My feelings are wrong" - Have you experienced: being told to stop crying, being punished for emotions, being told you\'re "too sensitive" or "dramatic"?',
            'BELIEF PATTERNS: For each wound that resonated (rated 3+), what specific beliefs did you form? (Examples: "I must be perfect to be loved," "I can\'t show my true self," "I have to handle everything alone")',
            'ADULT IMPACTS: How do these beliefs show up in your current life? (Relationships, career, self-talk, reactions to others)',
            'PROTECTIVE STRATEGIES: What do you do to prevent these wounds from hurting? (Perfectionism, isolation, controlling, people-pleasing, achievement, avoidance)',
            'BODY PATTERNS: Where do you hold these wounds in your body? (Tension, pain, numbness, digestive issues, etc.)',
            'HEALING MOMENTS: When have you felt the opposite of these wounds? What helped create those moments?',
            'INNER CHILD DIALOGUE: What would your younger self need to hear about these experiences? (For example: "It wasn\'t your fault," "You deserved love," "Your feelings were valid")'
          ],
          interactiveElements: [
            'wound-selector',
            'belief-mapper',
            'pattern-identifier',
            'body-scan-mapper',
            'healing-moments-journal'
          ]
        }
      },
      {
        type: 'learn',
        data: {
          id: 'learn-wound-specific-healing',
          title: 'Targeted Healing Strategies for Each Wound Type',
          content: [
            'Each type of Inner Child wound requires specific healing approaches and corrective experiences. Understanding these targeted strategies allows you to provide exactly what your young parts need to release their burdens and reclaim their natural qualities.',
            'REJECTION WOUNDS require experiences of unconditional acceptance and belonging. Healing involves: consistent presence during difficult emotions, validation of your authentic self even when it\'s imperfect, creating chosen family/friend relationships where you belong exactly as you are, and internal self-talk that emphasizes your inherent worthiness. The antidote to rejection is inclusive love.',
            'ABANDONMENT WOUNDS need reliability, consistency, and secure attachment. Healing includes: keeping promises to yourself, building relationships with reliable people, creating daily routines that provide stability, developing internal resources to soothe abandonment panic, and understanding that your Self will never abandon your parts. The antidote is secure, consistent presence.',
            'NEGLECT WOUNDS require attentive care, validation of needs, and nurturing. Healing involves: learning to identify and honor your physical/emotional needs, creating daily self-care rituals, seeking out nurturing relationships and experiences, allowing yourself to be cared for by others, and providing the loving attention your childhood lacked. The antidote is consistent, loving care.',
            'CRITICISM/SHAME WOUNDS need validation, non-judgment, and inherent worth recognition. Healing includes: practicing radical self-compassion, surrounding yourself with non-judgmental people, challenging the inner critic with Self energy, understanding that your worth isn\'t tied to performance, and embracing imperfection as part of being human. The antidote is unconditional positive regard.',
            'BETRAYAL WOUNDS require rebuilding trust, setting boundaries, and discernment. Healing involves: learning to trust your own wisdom and intuition, setting and maintaining healthy boundaries, working through forgiveness in your own timing, building relationships with trustworthy people, and understanding that betrayal reflects others\' limitations, not your worth. The antidote is trustworthy connection.',
            'HUMILIATION WOUNDS need dignity restoration, privacy respect, and vulnerability safety. Healing includes: reclaiming your dignity and self-respect, choosing carefully who sees your vulnerable side, practicing self-compassion for embarrassing moments, understanding that vulnerability is strength when shared safely, and creating spaces where you can be authentic without fear. The antidote is honored vulnerability.',
            'INJUSTICE WOUNDS need fairness validation, appropriate anger expression, and empowerment. Healing involves: validating that unfair things really did happen, finding healthy ways to express anger and frustration, advocating for yourself and others, creating your own sense of justice and integrity, and understanding that you don\'t need others to admit wrongdoing to heal. The antidote is empowered authenticity.',
            'LOSS/GRIEF WOUNDS require space for mourning, ritual, and continued connection. Healing includes: allowing yourself to fully grieve without timeline pressure, creating rituals to honor what was lost, finding ways to maintain meaningful connection with those/what you\'ve lost, understanding that grief is love with nowhere to go, and building new relationships while honoring old connections. The antidote is honored mourning.',
            'EMOTIONAL INVALIDATION WOUNDS need emotional literacy, validation, and permission to feel. Healing involves: learning to identify and name your emotions accurately, validating all your feelings as important signals, finding safe spaces for emotional expression, understanding that emotions have wisdom even when they\'re uncomfortable, and developing internal permission to feel everything. The antidote is emotional wisdom.',
            'For all wound types, the foundation of healing is your Self providing consistent, compassionate leadership. Your young parts need to know that you can handle their pain, won\'t abandon them when they\'re upset, and will advocate for their needs. This internal secure attachment is what allows deep unburdening to occur.',
            'Targeted healing also involves recognizing when multiple wounds overlap and interact. Rejection and shame often combine, as do abandonment and neglect. Understanding these patterns helps you provide comprehensive healing that addresses the complexity of your actual experience.',
            'The ultimate goal is not just wound release but reclaiming the natural qualities that got buried under burdens: joy for the Inner Child who learned to be serious, creativity for the one who learned to be practical, spontaneity for the one who learned to be cautious, confidence for the one who learned self-doubt.'
          ],
          bullets: [
            'Each wound type requires specific healing approaches and corrective experiences',
            'The antidote to each wound is its opposite positive experience',
            'Your Self can provide the exact healing experiences each wound type needs',
            'Multiple wounds often overlap and interact in complex patterns',
            'Healing involves both releasing burdens and reclaiming natural qualities',
            'Targeted strategies make healing more efficient and effective',
            'Your protectors need to understand these approaches to allow healing',
            'Consistency over time is more important than intensity in wound healing'
          ],
          keyTakeaways: [
            'Different wounds need different types of healing experiences to resolve',
            'Your Self can provide exactly what your Inner Child needed but didn\'t receive',
            'Understanding specific wound patterns helps you target healing effectively',
            'The antidotes to wounds are their opposite positive experiences',
            'Healing is both releasing negative burdens and reclaiming positive qualities',
            'Your protectors will relax more when they understand targeted healing approaches',
            'Complex trauma often involves multiple wound types that need integrated healing',
            'Your healed Inner Child brings gifts that compensate for early wound experiences'
          ],
          reflectionPrompts: [
            'Which wound types resonate most strongly with your experience? What healing experiences do you already have access to?',
            'What specific antidote experiences might you need to seek out or create for yourself?',
            'How have you already been providing some of these healing experiences without realizing it?',
            'What would change in your life if these wounds were significantly healed?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-wound-healing-plan',
          title: 'Personalized Wound Healing Action Plan',
          description: 'Create a comprehensive healing plan specific to your identified wound patterns',
          type: 'reflection',
          prompt: 'Based on your wound assessment, this activity will help you create a personalized healing plan that addresses your specific patterns and needs. This plan becomes your roadmap for providing the exact healing experiences your Inner Child parts need.',
          guidedSteps: [
            'Review your highest-scoring wounds from the assessment (those rated 3-5). These are your priority healing areas.',
            'For each priority wound, identify the specific beliefs your Inner Child formed and how these show up in your adult life.',
            'Choose one primary antidote experience for each wound type. For rejection wounds, this might be finding or creating a community where you belong. For abandonment wounds, it might be developing consistent self-care routines.',
            'Identify specific, actionable steps you can take this week to begin providing these antidote experiences. Start small – one action per wound type.',
            'Consider what support you need (friends, therapist, support groups) to provide these healing experiences safely.',
            'Create a daily check-in practice to notice when old wound patterns activate and respond with Self energy rather than protective reactions.',
            'Plan how you\'ll track your progress and celebrate small victories in healing these patterns.',
            'Write a compassionate letter to your Inner Child parts acknowledging their pain and committing to their healing.'
          ],
          questions: [
            'What are your top 2-3 priority wound types to focus on first?',
            'For each priority wound, what specific healing experience does your Inner Child need most right now?',
            'What small, daily actions can provide these antidote experiences consistently?',
            'What support systems will help you stay committed to this healing plan?',
            'How will you know when these wounds are beginning to heal? What signs will you notice?',
            'What fears or resistance do you notice about this healing process? What parts might be afraid?',
            'How can you modify this plan as you learn more about what works for your specific needs?',
            'What commitment can you make to your Inner Child parts for their ongoing healing and care?'
          ],
          interactiveElements: [
            'wound-healing-planner',
            'antidote-experience-mapper',
            'action-step-generator',
            'support-system-identifier',
            'progress-tracker'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-wound-understanding-complete',
          title: 'Inner Child Wound Wisdom Achieved',
          description: 'You\'ve gained comprehensive understanding of your specific wound patterns and healing pathways',
          completionMessage: 'Profound work! You\'ve completed a deep exploration of your Inner Child wounds and created personalized healing strategies. This understanding transforms self-criticism into compassion, confusion into clarity, and hopelessness into hope. Your young parts feel seen, understood, and hopeful about their healing journey.',
          nextSteps: [
            'Begin implementing your personalized wound healing plan, starting with small, consistent actions',
            'Continue building relationship with the protective parts that guard these wounds',
            'Practice Self-energy check-ins when old wound patterns activate in daily life',
            'Consider working with an IFS therapist for deeper unburdening work on specific wounds',
            'Create regular practices that provide the antidote experiences your Inner Child needs',
            'Celebrate small victories and progress in wound healing – this encourages continued healing',
            'Get ready to learn about your protective Manager parts and their valuable work in Module 3'
          ],
          achievement: 'Inner Child Wound Wisdom Keeper'
        }
      }
    ]
  },
  {
    id: 'module-3-protectors-unlocked',
    order: 3,
    title: 'Module 3: Understanding Your Protective System',
    description: 'Comprehensive exploration of Manager and Firefighter parts, their protective strategies, and building trust with your internal guardians',
    category: 'parts_system',
    estimatedMinutes: 50,
    prerequisites: ['module-2-inner-child-wounds'],
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-manager-parts',
          title: 'Your Manager Parts: The Proactive Protectors',
          content: [
            'Manager parts are the proactive protectors in your internal system – the diligent guardians who work tirelessly, often from the moment you wake up, to prevent your Inner Child wounds from being triggered. These parts developed their sophisticated strategies during childhood when they were genuinely necessary for your survival, acceptance, or safety.',
            'Common Manager parts include The Perfectionist ("If I\'m flawless, no one can criticize me"), The People-Pleaser ("If I make everyone happy, they won\'t reject me"), The Planner ("If I control everything, nothing bad will happen"), The Caretaker ("If I focus on others\' needs, I\'m valuable"), The Critic ("If I judge myself first, others can\'t hurt me"), The Controller ("If I manage every detail, I won\'t be surprised"), The Achiever ("If I succeed, I\'ll prove my worth"), and The Analyzer ("If I understand everything, I can prevent problems").',
            'Each Manager part has taken on a specific job based on childhood experiences where their strategy actually worked. The Perfectionist might have learned that flawless performance prevented harsh criticism. The People-Pleaser might have discovered that anticipating others\' needs reduced abandonment fears. The Planner might have found that controlling outcomes created stability in chaotic environments.',
            'These parts are carrying the burden of constant vigilance. They believe that if they relax their protective strategies for even a moment, the painful emotions and memories your Inner Child carries will overwhelm you and destroy your life. This fear isn\'t irrational – it\'s based on actual childhood experiences where emotional overwhelm was genuinely dangerous.',
            'Managers aren\'t trying to make your life rigid, joyless, or exhausting – they\'re desperately trying to protect vulnerable Inner Child parts from being hurt again. Their extreme strategies are love in disguise, even though they may feel like oppression. When you understand their protective mission, you can work with them rather than fighting against them.',
            'The challenge is that Manager strategies, while once adaptive, often create the very outcomes they\'re trying to prevent. Perfectionism leads to burnout and eventual criticism from others. People-pleasing creates resentment and eventual relationship breakdown. Control results in isolation and missed opportunities for genuine connection. Your Managers are caught in impossible paradoxes.',
            'Your Managers need to learn that you, as Self, have the capacity to handle the emotions they\'re protecting. They need evidence that you can be with rejection, abandonment, shame, or other painful feelings without falling apart. This trust building happens gradually through consistent demonstrations of Self leadership.',
            'Each Manager part has valuable positive qualities that can be reclaimed when they relax their extreme roles. The Perfectionist brings attention to detail and excellence. The People-Pleaser brings empathy and connection. The Planner brings foresight and organization. The Critic brings discernment and high standards. These qualities become assets rather than compulsions.',
            'Building relationship with your Managers involves: appreciating their hard work and positive intentions, understanding the childhood origins of their strategies, asking what they\'re trying to protect and what they fear would happen without their vigilance, reassuring them that you can handle difficult emotions, and helping them find new, healthier roles that utilize their positive qualities.',
            'Your Managers are not enemies to be defeated – they are devoted guardians who have been working without proper supervision or support for decades. When you become the wise, compassionate leader they\'ve been waiting for, they can finally relax their hyper-vigilance and collaborate in creating a life that\'s both safe and fulfilling.',
            'The journey with your Managers is one of building trust through consistency, demonstrating capacity through small challenges, and providing the leadership they\'ve been craving. As they learn to trust Self, your entire internal system begins to reorganize around confidence rather than fear, around connection rather than isolation, around authentic expression rather than protective performance.'
          ],
          bullets: [
            'Managers work proactively to prevent pain before it happens – they\'re your early warning system',
            'Their strategies (perfectionism, control, people-pleasing) made complete sense given your childhood experiences',
            'They carry the burden of constant vigilance, believing they\'re the only thing protecting you from overwhelm',
            'Manager parts have positive intentions and valuable qualities, even when their methods feel extreme',
            'They need evidence that your Self can handle emotional intensity without falling apart',
            'Trust building happens gradually through consistent demonstrations of Self leadership',
            'Managers can transform into valued allies when they relax their extreme protective roles',
            'Your protectors have been working without proper leadership for decades – they need your guidance'
          ],
          keyTakeaways: [
            'Your Manager parts are protective guardians, not punitive enemies – they\'re trying to keep you safe',
            'Their rigid strategies are actually attempts to protect your Inner Child wounds from being re-triggered',
            'Understanding their positive intentions is the key to building trust and collaboration',
            'Your Managers need to learn that your Self can handle the emotions they\'re protecting',
            'Appreciation and curiosity work far better than resistance and frustration with Manager parts',
            'Each Manager has valuable qualities that can be reclaimed when they relax extreme behaviors',
            'Consistent Self leadership provides the safety they need to gradually release hyper-vigilance',
            'Your protectors are waiting for the wise leader who can help them transform their roles'
          ],
          reflectionPrompts: [
            'Which Manager parts do you notice most active in your daily life? When do they show up?',
            'What might your Manager parts be trying to protect you from? What Inner Child wounds are they guarding?',
            'How do your Manager strategies sometimes create the very problems they\'re trying to prevent?',
            'What would help your Manager parts feel more relaxed and trusting of your leadership?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-meet-your-managers',
          title: 'Meeting and Understanding Your Manager Parts',
          description: 'Build relationship with your proactive protectors through appreciation, understanding, and trust-building',
          type: 'parts_work',
          prompt: 'Your Manager parts have been working tirelessly to protect you for years. Many have been on duty since childhood, carrying heavy burdens of constant vigilance. This is your opportunity to meet them with the curiosity, appreciation, and compassion they deserve. Approach this work with patience – these parts may be suspicious of sudden attention.',
          questions: [
            'PART IDENTIFICATION: What protective strategies do you notice yourself using regularly? (Be specific: planning ahead, being perfect, pleasing others, analyzing everything, staying busy, criticizing yourself, controlling situations)',
            'NAME YOUR MANAGERS: Give each distinct strategy a descriptive name. What personalities emerge? (Examples: "The Perfectionist," "The People-Pleaser," "The Planner," "The Critic," "The Controller")',
            'POSITIVE INTENTIONS: For each Manager, ask: "What are you trying to accomplish for me? What positive outcome are you seeking?" What do they say their purpose is?',
            'FEAR INQUIRY: Ask each Manager: "What are you afraid would happen if you stopped doing your job? What\'s the worst-case scenario you\'re preventing?" Listen without judgment to their fears.',
            'CHILDHOOD ORIGINS: Can you remember when this Manager first took on their role? What childhood situation made their strategy necessary or effective?',
            'CURRENT IMPACTS: How do these Manager strategies affect your current life? What do they help with, and what do they limit?',
            'APPRECIATION EXPRESSION: What genuine appreciation do you have for these Managers? What have they protected you from over the years?',
            'FUTURE ROLE: If these Managers didn\'t have to work so hard at protection, what would they enjoy doing? What new roles might they take on?',
            'TRUST BUILDING: What would help these Managers trust you more? What reassurances do they need from you?',
            'COLLABORATION INVITATION: How could you work together with these Managers rather than fighting their efforts?'
          ],
          interactiveElements: [
            'manager-identifier',
            'protection-mapper',
            'appreciation-generator',
            'trust-building-planner'
          ]
        }
      },
      {
        type: 'learn',
        data: {
          id: 'learn-firefighter-parts',
          title: 'Your Firefighter Parts: The Emergency Responders',
          content: [
            'Firefighter parts are the emergency responders of your internal system – the rapid deployment team that activates when your Inner Child wounds are already triggered and painful emotions are surfacing. Unlike Managers who try to prevent pain, Firefighters react when emotional fire is already raging and immediate extinguishing is required.',
            'Common Firefighter strategies include substance use (alcohol, food, drugs, shopping), dissociation or numbing out (checking out, binge-watching, gaming), compulsive behaviors (cleaning, working, exercising, sex), rage or explosive anger, risky behaviors (reckless driving, extreme sports, unsafe choices), and extreme withdrawal or isolation (shutting down, disappearing for hours or days).',
            'Firefighters get activated when Managers can\'t prevent Inner Child pain from breaking through. They\'re like paramedics rushing to an emergency scene with sedation and painkillers. While their methods may feel extreme, destructive, or embarrassing, their intention is purely protective – they\'re trying to stop unbearable emotional pain immediately.',
            'Firefighter parts often developed during times when you had absolutely no other way to cope with overwhelming emotional experiences. They might have emerged during abuse situations, loss trauma, or periods of intense shame or humiliation where dissociation was the only way to survive psychologically. These parts literally saved you.',
            'The challenge is that Firefighter strategies, while effective for immediate pain relief, often create additional problems: substance abuse, relationship damage, health issues, financial problems, legal troubles, or deeper shame and guilt. Your Firefighters are caught in a cycle of emergency response followed by cleanup, followed by more emergencies.',
            'Firefighters are often the most exiled and judged parts in your system. Other parts (especially Managers) are ashamed of their extreme behaviors. Society certainly judges coping mechanisms like addiction or rage. Your Firefighters carry immense burden of shame on top of their protective burden.',
            'It\'s crucial to understand that Firefighters are not "bad parts" or "addictions" to be eliminated – they\'re desperate parts doing their best with the only tools they have. They need to know there\'s a safer, more effective way to handle overwhelming emotions before they\'ll consider changing their strategies.',
            'Building trust with Firefighters requires: acknowledging their genuine protective value, appreciating how they\'ve saved you in the past, understanding their desperation and fear, creating safety for them to share their truth, introducing alternative coping strategies gradually, and consistently demonstrating that you can handle emotional intensity without emergency measures.',
            'Firefighters need to know that Self can be with intense emotions without being overwhelmed, that there are healthier ways to soothe distress, and that they won\'t be abandoned or punished for their past actions. They need reassurance that their protective instinct is valued even if their methods need updating.',
            'As Firefighters learn to trust Self leadership, they can transform from emergency responders to valued allies. The rage part might become healthy boundaries and self-advocacy. The dissociation part might become healthy detachment and perspective. The compulsive working part might become productive contribution and achievement. Their energy gets channeled productively.',
            'Your Firefighters have been on the front lines of your emotional emergencies for years. They deserve the same compassion, understanding, and patient trust-building that all your parts need. They\'re often the most loyal and protective parts, willing to do whatever it takes to shield you from pain.',
            'The journey with Firefighters is one of demonstrating capacity, creating alternatives, building trust through consistency, and honoring their protective service while gradually introducing new possibilities. As they learn that Self can handle emotional intensity, they can relax their emergency responses and collaborate in creating authentic emotional regulation.'
          ],
          bullets: [
            'Firefighters activate when you\'re already overwhelmed with painful emotions – they\'re emergency responders',
            'Their extreme strategies are designed for immediate relief, not long-term solutions',
            'Firefighters often developed during times when you had no other way to cope with overwhelming pain',
            'These parts carry intense shame and judgment in addition to their protective burdens',
            'They need to know there are safer, more effective ways to handle overwhelming emotions',
            'Building trust with Firefighters requires acknowledging their genuine protective value',
            'Firefighters can transform their energy into healthy coping skills and self-regulation',
            'These parts have been on the front lines of your emotional emergencies for years'
          ],
          keyTakeaways: [
            'Firefighters are emergency protectors, not self-destructive enemies – they\'re trying to stop unbearable pain',
            'Their extreme strategies make perfect sense when you understand the intensity of emotions they\'re managing',
            'Firefighters need your Self to provide safer alternatives for handling overwhelming emotions',
            'These parts carry immense shame and need compassion rather than judgment or elimination',
            'Trust building requires demonstrating capacity to handle emotional intensity without emergency measures',
            'Firefighter energy can transform into healthy boundaries, authentic self-regulation, and emotional wisdom',
            'Your Firefighters have been protecting you during your most vulnerable moments – they deserve honor',
            'Consistent Self leadership helps Firefighters relax emergency responses and trust emotional safety'
          ],
          reflectionPrompts: [
            'What emergency coping strategies do you notice when you feel overwhelmed by painful emotions?',
            'When do your Firefighter parts most tend to activate? What situations or emotions trigger them?',
            'How do you relate to these parts? Do you judge them, try to eliminate them, or can you see their protective value?',
            'What would help these parts trust that there are safer ways to handle overwhelming emotions?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-firefighter-connection',
          title: 'Building Trust with Your Firefighter Parts',
          description: 'Create safety and understanding for your emergency responders through appreciation and alternative strategies',
          type: 'parts_work',
          prompt: 'Your Firefighter parts have been handling your emotional emergencies for years, often at great personal cost. They deserve to be met with compassion, understanding, and respect. This work requires patience – Firefighters are often suspicious of attention because they\'re used to being judged or punished for their methods.',
          questions: [
            'FIREFIGHTER IDENTIFICATION: What emergency coping strategies do you use when overwhelmed? (Be honest: substance use, dissociation, rage, compulsive behaviors, risk-taking, withdrawal, etc.)',
            'TRIGGER RECOGNITION: What emotions or situations trigger these emergency responses? When do Firefighters activate?',
            'PROTECTIVE VALUE: Ask each Firefighter: "What are you trying to protect me from? What pain are you preventing?" What do they say?',
            'ORIGIN STORIES: Can you remember when these Firefighter strategies first developed? What emotional emergencies made them necessary?',
            'CURRENT CONSEQUENCES: How do these strategies affect your life now? What problems do they solve, and what problems do they create?',
            'SHAME AND JUDGMENT: How do you (and others) judge these parts? What shame do they carry for their protective actions?',
            'APPRECIATION: What genuine gratitude do you have for how these parts have saved you from unbearable pain?',
            'ALTERNATIVE COPING: What healthier ways could you handle overwhelming emotions? What self-soothing strategies feel safe?',
            'GRADUAL TRANSITION: How could you gradually introduce new coping strategies while maintaining safety?',
            'TRUST BUILDING: What would help your Firefighters trust you with their pain? What reassurances do they need?'
          ],
          interactiveElements: [
            'firefighter-identifier',
            'trigger-mapper',
            'alternative-coping-planner',
            'trust-building-exercises'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-protectors-understood',
          title: 'Protector Partnership Achieved',
          description: 'You\'ve built understanding and trust with your protective Manager and Firefighter parts',
          completionMessage: 'Profound transformation! You\'ve developed compassionate relationships with your protective system – the dedicated guardians who have been working to keep you safe for decades. Your Managers and Firefighters are beginning to trust that your Self can provide the safety and leadership they\'ve been seeking. This partnership creates the foundation for deep Inner Child healing.',
          nextSteps: [
            'Continue daily check-ins with your protectors – thank them for their service and ask what they need',
            'Practice inviting protectors to step back when you want to work directly with Inner Child parts',
            'Notice when protective patterns activate and respond with curiosity rather than frustration',
            'Create and practice alternative coping strategies for when emotions feel overwhelming',
            'Document your growing understanding of each protector\'s unique role and value',
            'Get ready to strengthen your Self leadership in Module 4 – the foundation for all parts work',
            'Consider working with an IFS therapist to deepen your work with particularly protective or traumatized parts'
          ],
          achievement: 'Protector Partnership Master'
        }
      }
    ]
  },
  {
    id: 'module-4-self-leadership',
    order: 4,
    title: 'Module 4: Developing Self Leadership',
    description: 'Master the art of leading your internal system with confidence, compassion, and wisdom through advanced Self-energy cultivation',
    category: 'self_leadership',
    estimatedMinutes: 40,
    prerequisites: ['module-3-protectors-unlocked'],
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-advanced-self-leadership',
          title: 'Advanced Self Leadership for Inner Child Healing',
          content: [
            'Self leadership is the cornerstone of effective IFS work and the essential foundation for Inner Child healing. When you lead from Self, you create the safety, wisdom, and compassion that allows all parts – especially wounded Inner Child parts and protective guardians – to trust you enough to transform their roles.',
            'The 8 C\'s of Self – Curiosity, Compassion, Calm, Clarity, Confidence, Courage, Creativity, and Connectedness – are not just qualities to admire; they are practical tools that serve specific functions in different parts work scenarios. Each C addresses particular challenges and builds specific types of trust with different parts.',
            'Curiosity is the master key for accessing parts safely. Instead of judgment ("Why do I keep doing this?") or analysis ("This comes from my childhood trauma"), curiosity asks "What is this part trying to accomplish?" "What does it need?" "What is it afraid of?" This open, interested stance immediately signals safety to parts.',
            'Compassion is essential for working with wounded Inner Child parts. When a young part shares painful memories or overwhelming emotions, compassion allows you to feel with them rather than trying to fix them. This is the loving presence they needed but didn\'t receive during the original overwhelming experience.',
            'Calm provides the foundation for working with intense emotions and memories. Self-calm isn\'t the absence of feeling but rather the capacity to be with intensity without being overwhelmed. It\'s the steady hand on your own shoulder when everything inside is in chaos.',
            'Clarity allows you to see situations and parts without the distortion of extreme emotions or beliefs. When you\'re merged with a part, you believe its reality completely. Clarity creates the space to see "This is a part of me, not all of me" – the crucial distinction that allows transformation.',
            'Confidence builds trust with protective parts that fear emotional overwhelm. Your Managers and Firefighters need to know that you can handle whatever emotions, memories, or realities they\'ve been protecting. This confidence comes from successful experiences of being with difficult feelings.',
            'Courage is necessary for facing the traumatic memories and intense emotions that Inner Child parts carry. Many parts have kept these experiences buried because they believe you can\'t handle them. Your courage signals that you\'re willing to face reality for the sake of healing.',
            'Creativity helps find new solutions when old protective strategies aren\'t working. When a Manager\'s approach creates more problems than it solves, creativity can discover innovative ways to meet both the part\'s needs and your authentic expression.',
            'Connectedness reminds you that all parts belong to you and deserve love and inclusion. This is especially important when working with exiled parts that feel unlovable or shameful. Connectedness creates the foundation of unconditional positive regard.',
            'Developing Self leadership is not about achieving perfection but rather about building capacity through practice. Each time you successfully navigate a parts interaction from Self, you build trust and confidence. Each time you recognize when you\'ve been blended with a part and gently return to Self, you strengthen your leadership.',
            'Your Inner Child parts especially need consistent Self leadership. They\'ve been waiting for a wise, loving parent who can provide what they needed but didn\'t receive. As you demonstrate this leadership repeatedly, their healing accelerates dramatically.',
            'The ultimate goal is not just individual Self moments but rather the development of an internal system led consistently by Self, where parts feel safe enough to relax their extreme roles and collaborate in creating a fulfilling, authentic life.'
          ],
          bullets: [
            'Self leadership is the practical foundation that makes all parts work possible and effective',
            'Each of the 8 C\'s serves specific functions in building trust with different types of parts',
            'Self qualities are not achievements to earn but natural states to access and strengthen',
            'Your Inner Child parts respond especially strongly to consistent Self leadership',
            'Self leadership develops through practice, not perfect performance',
            'Every parts interaction is an opportunity to strengthen Self leadership',
            'Confidence grows through successful experiences of handling difficult emotions',
            'Your parts have been waiting for the wise leader who can provide safety and guidance'
          ],
          keyTakeaways: [
            'Self leadership is learnable and develops through consistent practice and patience',
            'The 8 C\'s work together as a comprehensive toolkit for all types of parts work',
            'Your Inner Child healing accelerates dramatically under consistent Self leadership',
            'Self confidence comes from proven capacity, not from pretending to be strong',
            'Parts learn to trust Self through repeated positive experiences of safe leadership',
            'Self leadership transforms your entire internal system, not just individual parts',
            'Your protectors relax as they experience reliable Self leadership over time',
            'You are becoming the wise, compassionate parent your Inner Child always needed'
          ],
          reflectionPrompts: [
            'Which of the 8 C\'s feels most accessible to you right now? Which feels most challenging?',
            'When have you successfully led from Self in a difficult internal situation? What made that possible?',
            'What parts seem most active when you try to access Self leadership? What are they afraid might happen?',
            'How would your daily life change if you led more consistently from Self energy?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-self-leadership-mastery',
          title: 'Self Leadership Mastery Practice',
          description: 'Develop advanced Self leadership through intensive practice with challenging internal situations',
          type: 'meditation',
          prompt: 'This intensive practice will help you cultivate and strengthen your Self leadership capacity through working with real-time internal challenges. Choose a recent situation where parts were active, or be prepared to work with whatever arises during this practice.',
          guidedSteps: [
            'Begin by finding a comfortable position and taking several deep breaths to center yourself.',
            'Bring to mind a recent situation where you felt internal conflict, overwhelming emotions, or reactive patterns.',
            'Invite Curiosity about this situation – ask "What was really happening internally? What parts were active?"',
            'Access Compassion for all parts involved – recognize they were all trying to help in their own ways.',
            'Connect with Calm presence – you can handle whatever comes up in this exploration.',
            'Gain Clarity by distinguishing between Self and parts – "I am not these parts, I am the one who can lead them."',
            'Build Confidence by remembering times you\'ve successfully navigated challenges.',
            'Feel Courage to face whatever truths or emotions may emerge during this work.',
            'Invite Creativity to find new ways of relating to these parts and situations.',
            'Experience Connectedness with all parts of your internal system.',
            'Work directly with one active part – ask what it needs, what it fears, what it wants.',
            'Lead the situation from Self – what would you do differently with full Self leadership?',
            'Make a commitment to continue practicing Self leadership in daily life.',
            'Close with appreciation for your Self and all parts for their willingness to grow and heal.'
          ],
          questions: [
            'What did you discover about your Self leadership capacity during this practice?',
            'Which parts seem to trust your leadership most? Which seem more hesitant?',
            'What challenges arose in maintaining Self presence? How did you work with them?',
            'What commitment can you make to strengthening your Self leadership in daily life?',
            'How might your Inner Child parts respond differently with more consistent Self leadership?',
            'What support do you need to continue developing your Self leadership?',
            'What differences do you notice when you lead from Self versus when parts are in charge?',
            'How will you practice Self leadership with particularly challenging parts or situations?'
          ],
          interactiveElements: [
            'guided-meditation',
            'self-energy-meter',
            'leadership-challenge-practice',
            'daily-commitment-planner'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-self-leadership-strengthened',
          title: 'Self Leadership Mastery Achieved',
          description: 'You\'ve developed strong Self leadership capacity and confidence to guide your internal system',
          completionMessage: 'Outstanding achievement! You\'ve significantly strengthened your Self leadership capacity and developed the confidence to guide your internal system with wisdom and compassion. Your parts, especially your Inner Child, are sensing that you can provide the safety and leadership they\'ve been seeking. This foundation will support all your future healing work.',
          nextSteps: [
            'Practice brief Self-leadership check-ins throughout your day – "Am I in Self or has a part taken over?"',
            'Use Self leadership when parts activate during daily challenges – invite them to step back and let Self lead',
            'Document successful Self-leadership moments to build confidence and recognize patterns',
            'Continue building trust with protectors by demonstrating consistent leadership',
            'Apply Self leadership increasingly to challenging situations and difficult parts',
            'Share your Self leadership journey with others who might benefit from your experience',
            'Get ready to learn the systematic 6 F\'s protocol for structured parts work in Module 5'
          ],
          achievement: 'Self Leadership Master'
        }
      }
    ]
  },
  {
    id: 'module-5-six-fs-protocol',
    order: 5,
    title: 'Module 5: The 6 F\'s Protocol Mastery',
    description: 'Complete mastery of the systematic 6 F\'s approach to working with any part, especially your Inner Child parts',
    category: 'protocols',
    estimatedMinutes: 55,
    prerequisites: ['module-4-self-leadership'],
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-six-fs-comprehensive',
          title: 'The 6 F\'s Protocol: Systematic Parts Work Mastery',
          content: [
            'The 6 F\'s protocol provides a systematic, safe, and effective framework for working with any part in your internal system. Developed by Dr. Richard Schwartz, this approach creates the necessary structure and safety for deep transformation, especially with vulnerable Inner Child parts and protective guardians.',
            'FIND is the art of recognizing when a part is active versus being completely merged with it. Finding involves noticing parts as distinct entities – "something in me feels angry" rather than "I am angry." This distinction creates the space necessary for Self leadership to emerge.',
            'FOCUS means directing your compassionate, curious attention to the part you\'ve found. This is like turning to face a family member who\'s been trying to get your attention. Focus signals to the part that you\'re willing to listen, understand, and be present with whatever it carries.',
            'FLESH OUT involves gathering detailed information about the part in a respectful, curious way. What does the part look like? How old does it feel? What\'s its role in your system? What is it trying to accomplish for you? What emotions is it carrying? What burdens does it hold? What is it afraid would happen if it stopped its current role?',
            'FEEL TOWARD requires you to notice your emotional response to the part. Can you feel curiosity and compassion? Or do you notice judgment, frustration, fear, or avoidance? If you\'re not in Self, you need to work with the part that has taken over before returning to the original part. This self-awareness is crucial for authentic connection.',
            'BEFRIEND is the process of building trust and relationship with the part. This involves expressing genuine appreciation for its efforts and positive intentions, acknowledging its hard work and loyalty, validating the reality of what it\'s protecting against, and building enough trust for the part to share its deeper truth.',
            'FEAR asks the part to share its deepest concerns: "What are you afraid would happen if you stopped doing your job?" This reveals the vulnerability the part is protecting and often uncovers the core wound or burden it\'s carrying. Understanding these fears is essential for creating safety and eventual unburdening.',
            'Throughout the 6 F\'s process, if at any point you notice you\'re not in Self (judgment, frustration, anxiety, etc.), you simply acknowledge this, work with the activated part, and then return to the original part. This iterative process builds genuine Self leadership.',
            'The 6 F\'s are especially valuable for Inner Child work because they create the safety that young, wounded parts need to share their truth and consider transformation. The systematic nature prevents retraumatization and ensures that healing happens at the part\'s pace.',
            'This protocol also works beautifully with protective parts. Managers and Firefighters often respond well to being understood and appreciated rather than fought against. The 6 F\'s help you understand their positive intentions and address their fears.',
            'Mastery of the 6 F\'s comes through practice, not just intellectual understanding. Each part you work with teaches you something new about your internal system and deepens your capacity for Self leadership.',
            'The 6 F\'s protocol is not rigid or mechanical – it\'s a flexible framework that adapts to each unique part and situation. The art is in knowing when to spend more time on certain steps and how to follow the part\'s lead while maintaining Self leadership.',
            'As you master the 6 F\'s, you\'ll develop the confidence to work with any part that arises, knowing you have a reliable, effective process that creates safety, builds trust, and facilitates genuine transformation.'
          ],
          bullets: [
            'The 6 F\'s provide a systematic framework that creates safety and structure for all parts work',
            'Each F builds relationship and understanding in a specific way, creating momentum toward trust',
            'The protocol helps you stay in Self while working with difficult or traumatized parts',
            'This approach is especially valuable for working with vulnerable Inner Child parts',
            'The 6 F\'s work equally well with protective Managers and Firefighters',
            'Mastery develops through practice with many different types of parts and situations',
            'The protocol is flexible – art lies in adapting it to each unique part while maintaining structure',
            'Consistent use of the 6 F\'s builds confidence and capacity for deep transformational work'
          ],
          keyTakeaways: [
            'The 6 F\'s create the safety necessary for deep Inner Child healing and protector transformation',
            'Each step builds specific types of trust and understanding with different parts',
            'Self leadership is maintained throughout the process through emotional self-awareness',
            'The protocol prevents overwhelm and retraumatization through systematic progression',
            'Your parts learn to trust the process as they experience positive results from 6 F\'s work',
            'Mastery comes through practice, not just theoretical understanding',
            'The 6 F\'s work with all parts types – wounded, protective, and resources',
            'This systematic approach builds your confidence to work with any challenging part'
          ],
          reflectionPrompts: [
            'Which step of the 6 F\'s feels most natural to you? Which feels most challenging?',
            'How might the 6 F\'s change how you work with parts that have seemed particularly difficult?',
            'What parts might benefit most from this systematic approach? Which ones are you most curious about?',
            'How does having this framework change your confidence in working with your internal system?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-six-fs-mastery-practice',
          title: '6 F\'s Protocol Mastery Practice',
          description: 'Apply the 6 F\'s protocol to work deeply with a significant part in your system',
          type: 'protocol',
          prompt: 'Choose a part that has been active recently or one that you\'re particularly curious about. This could be a Manager, Firefighter, or Inner Child part. We\'ll walk through the complete 6 F\'s process to build relationship and understanding. Take your time with each step – depth is more important than speed.',
          guidedSteps: [
            '**FIND**: Notice which part wants to work with you. What physical sensations, emotions, thoughts, or behavioral patterns are present? Can you identify this as "something in me" rather than all of you?',
            '**FOCUS**: Direct your full, compassionate attention to this part. Give it your complete presence and curiosity.',
            '**FLESH OUT**: Ask the part (with genuine curiosity): What do you look like? How old do you feel? What\'s your role in my system? What are you trying to accomplish for me? What emotions are you carrying? What burdens do you hold?',
            '**FEEL TOWARD**: Notice your emotional response to this part. Can you feel curiosity and compassion? Or is another part activated? If needed, work with the activated part first.',
            '**BEFRIEND**: Express appreciation to the part. Say something like: "Thank you for working so hard to help me. I see your positive intention. I want to understand you better and build trust with you."',
            '**FEAR**: Ask the part: "What are you afraid would happen if you stopped doing your job? What\'s the worst-case scenario you\'re preventing? What would be unbearable for you or for me?"',
            'After completing the 6 F\'s, take a moment to notice what has shifted in your relationship with this part.',
            'Ask the part: "What do you need from me moving forward? How can we work together better?"',
            'Express your commitment to this part\'s wellbeing and to your ongoing relationship.',
            'Thank the part again for its willingness to communicate and trust.',
            'Take a few deep breaths and notice how you feel after this 6 F\'s process.'
          ],
          questions: [
            'What did you learn about this part through the 6 F\'s process that surprised you?',
            'How did your relationship with this part change from beginning to end of the process?',
            'What fears or concerns did the part share? How do these connect to your childhood experiences?',
            'What does this part need from you moving forward? How can you provide this?',
            'How did staying in Self (and returning to Self when needed) affect the process?',
            'What challenges arose in the 6 F\'s process? How did you work with them?',
            'How might you work differently with this part now that you\'ve completed the 6 F\'s?',
            'What other parts might benefit from this systematic approach? Which ones are you curious to work with next?'
          ],
          interactiveElements: [
            'six-fs-wizard',
            'part-dialogue-journal',
            'relationship-progress-tracker',
            'self-leadership-monitor'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-six-fs-mastered',
          title: '6 F\'s Protocol Mastery Achieved',
          description: 'You\'ve mastered the systematic approach to working with any part in your internal system',
          completionMessage: 'Congratulations! You\'ve mastered the 6 F\'s protocol – your reliable framework for working with any part in your system. This systematic approach creates safety, builds trust, and provides structure for even the most challenging parts work. Your Inner Child parts especially benefit from this gentle, respectful approach that honors their pace and needs.',
          nextSteps: [
            'Use the 6 F\'s regularly with active parts to build momentum and deepen relationships',
            'Apply the protocol to your protective parts to strengthen their trust in Self leadership',
            'Document your 6 F\'s work to track patterns, progress, and insights',
            'Teach the 6 F\'s to curious parts who want to understand your healing process',
            'Consider working with an IFS therapist for deeper unburdening work using the 6 F\'s foundation',
            'Practice adapting the 6 F\'s framework to different types of parts and situations',
            'Continue building your foundation for the sacred work of Inner Child unburdening in Module 6',
            'Share your 6 F\'s experience with others who might benefit from this systematic approach'
          ],
          achievement: '6 F\'s Protocol Master'
        }
      }
    ]
  },
  {
    id: 'module-6-inner-child-healing',
    order: 6,
    title: 'Module 6: Inner Child Unburdening & Integration',
    description: 'Master the sacred process of healing your Inner Child wounds and living with integrated wholeness and joy',
    category: 'unburdening',
    estimatedMinutes: 60,
    prerequisites: ['module-5-six-fs-protocol'],
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-unburdening-sacred-process',
          title: 'The Sacred Process of Inner Child Unburdening',
          content: [
            'Unburdening is the sacred heart of IFS work – where your Inner Child parts finally release the burdens they\'ve carried for years, decades, or even lifetimes. These burdens are toxic beliefs and painful emotions absorbed during overwhelming experiences: "I\'m unlovable," "I\'m worthless," "It\'s all my fault," "I\'m too much," "I\'m invisible," "I don\'t deserve love." These were never true about your parts – they were lies absorbed during moments of overwhelm when your young parts lacked the perspective and resources to process reality accurately.',
            'The unburdening process is a sacred ceremony of transformation. It happens when your Inner Child part feels completely witnessed with compassion by your Self, trusts that you can handle its pain without falling apart, and becomes ready to release burdens that have become too heavy to carry. This isn\'t about intellectual understanding or talking parts out of their beliefs – it\'s about providing the loving, corrective experience your young parts needed but didn\'t receive when the burdens were absorbed.',
            'The complete unburdening process involves several crucial stages: First, getting permission from your protective Managers and Firefighters to access the wounded Inner Child part. These protectors need to trust that you can handle the emotions and that you\'ll keep the young part safe. Second, witnessing the part\'s story with complete compassion and presence, allowing it to share the original overwhelming experiences without trying to fix or rush the process. Third, helping the part physically and emotionally leave the past situation – this often involves literally helping it walk away from the traumatic scene.',
            'Fourth, asking the part what specific burdens it wants to release. The part will usually identify the exact beliefs, emotions, or sensations it\'s carrying. Fifth, choosing how to release these burdens – traditionally through the elements: fire (burning away), water (washing away), earth (releasing into ground), wind (blowing away), or light (dissolving into light). Sixth, inviting in positive qualities to replace the released burdens – qualities like love, worthiness, safety, innocence, or joy.',
            'The actual unburdening moment is often profound and transformative. You might see the part visibly lighten, change posture, or take on new qualities. The part might express relief, joy, or peacefulness. You might feel corresponding shifts in your own body and emotions. This is the moment when decades of pain release in seconds or minutes.',
            'What makes unburdening so powerful is that it\'s not just intellectual release – it\'s experiential transformation. The part doesn\'t just believe different things; it actually becomes different. Its core essence emerges, free from the burdens that obscured its true nature. A part burdened with shame might reveal itself as innocent and worthy. A part burdened with fear might reveal itself as courageous and curious.',
            'Unburdening creates system-wide transformation, not just individual part healing. When a significant burden releases, your protectors can relax their extreme jobs. Your whole internal system reorganizes around greater lightness and freedom. You might notice corresponding changes in your external life – relationship patterns shift, emotional reactivity decreases, new capacities emerge.',
            'It\'s crucial to understand that unburdening is not something you force or make happen. You create the conditions for it – safety, trust, compassion, presence – but the part decides when and if it\'s ready to release. Some parts need more relationship-building before they\'re ready. Others might release multiple layers of burden over time.',
            'Deep unburdening work is ideally done with the support of a trained IFS therapist, especially for severe trauma or overwhelming burdens. A therapist provides additional safety, guidance, and capacity that can be invaluable for the most challenging unburdening processes.',
            'However, many smaller burdens can be released safely on your own, especially after you\'ve built strong relationships with your parts and demonstrated consistent Self leadership. The key is knowing your limits and seeking support when needed.',
            'Integration after unburdening is as important as the release itself. Your healed parts need to understand their new roles, practice their emerging qualities, and learn to collaborate in your new internal system. This integration phase ensures that healing lasts and transforms your daily life.',
            'The sacred beauty of unburdening is that it reveals the truth of who your parts have always been beneath their burdens – innocent, worthy, loving, and valuable aspects of your essential being. Your Inner Child parts return to their natural state of joy, creativity, spontaneity, and wisdom.',
            'As you experience unburdening, you\'re not just healing individual parts – you\'re remembering and reclaiming lost aspects of your own wholeness. Each unburdening brings you closer to the integrated, joyful, authentic self you\'ve always been beneath the protective layers and painful burdens.'
          ],
          bullets: [
            'Unburdening helps Inner Child parts release toxic beliefs and emotions absorbed during overwhelming experiences',
            'These burdens were never the part\'s true nature – they were lies absorbed during moments of trauma',
            'The process requires permission from protectors, compassionate witnessing, and safe release',
            'Unburdening creates system-wide transformation, not just individual part healing',
            'Parts must decide when they\'re ready – unburdening cannot be forced or rushed',
            'Deep unburdening work often benefits from professional support and guidance',
            'The process reveals the part\'s true essence beneath burdens – its natural qualities and gifts',
            'Integration after unburdening ensures lasting transformation in daily life'
          ],
          keyTakeaways: [
            'Your Inner Child parts are ready to release the burdens they\'ve carried for far too long',
            'Unburdening provides the loving corrective experiences your young parts always needed',
            'The sacred release process creates profound transformation at both individual and system levels',
            'Your healed Inner Child brings back the joy, creativity, and authenticity that was buried under pain',
            'Self leadership provides the safety and capacity needed for successful unburdening',
            'Each unburdening reveals more of your essential wholeness and authentic nature',
            'The integration phase ensures that healing transforms your actual daily experience',
            'Your internal system can become a source of strength, joy, and wisdom rather than conflict'
          ],
          reflectionPrompts: [
            'What burdens might your Inner Child parts be ready to release? What feels heavy or painful?',
            'What would your life look and feel like without these old wounds and burdens?',
            'What fears or concerns do you have about the unburdening process? What parts might be afraid?',
            'What support do you need to create the safety necessary for deep healing work?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-unburdening-preparation',
          title: 'Preparing for Sacred Unburdening Work',
          description: 'Create the safety and readiness necessary for profound Inner Child healing and transformation',
          type: 'parts_work',
          prompt: 'Unburdening your Inner Child is the most sacred and transformative work in IFS. Before proceeding, we need to ensure your protective system feels safe, you have strong Self leadership, and you\'re prepared for the emotional intensity that may arise. This preparation is crucial for creating the safety your young parts need.',
          questions: [
            'SELF LEADERSHIP READINESS: Can you reliably access Self-energy when parts are highly activated? Rate your confidence 1-10. What evidence do you have that you can handle intense emotions?',
            'PROTECTOR PERMISSION: Ask your Manager parts: "Are you comfortable with me connecting with the wounded parts that carry pain?" What do they say? What concerns do they have? What do they need from you?',
            'FIREFIGHTER PERMISSION: Ask your Firefighter parts the same question: "Are you okay with me approaching the painful emotions and memories?" What\'s their response? What fears emerge? What reassurances do they need?',
            'SUPPORT SYSTEM ASSESSMENT: What support do you have available for intense emotional processing? (Therapist, trusted friends, family, support groups, spiritual community). Who can you call if things feel overwhelming?',
            'TIMING AND ENVIRONMENT: Is this a good time for deep emotional work? Do you have space, time, and resources to process if intense emotions arise? What might need to wait until you have more support?',
            'EMOTIONAL CAPACITY: On a scale of 1-10, how much emotional intensity can you handle right now? What are your signs of overwhelm? What are your grounding and self-soothing strategies?',
            'PART READINESS: Which Inner Child parts seem ready for unburdening? Which ones need more relationship-building first? What parts are still too fragile or fearful?',
            'INTENTION CLARITY: What is your intention for this unburdening work? What healing are you seeking? What transformation are you hoping for?',
            'BOUNDARIES AND LIMITS: What are your boundaries for this work? What will you not do? When will you seek professional help? What are your stop signals?',
            'CELEBRATION PREPARATION: How will you honor and celebrate this sacred work? What rituals or practices will help integrate the healing?'
          ],
          interactiveElements: [
            'readiness-assessment',
            'permission-seeker',
            'safety-planner',
            'support-system-mapper',
            'boundary-setter'
          ]
        }
      },
      {
        type: 'learn',
        data: {
          id: 'learn-integration-living',
          title: 'Living with Your Healed Inner Child: Integration and Daily Practice',
          content: [
            'After unburdening, integration is about learning to live in a new way with your healed Inner Child and transformed internal system. This isn\'t a destination you arrive at but rather an ongoing relationship practice of living with your healed internal family in harmony and collaboration.',
            'Your healed Inner Child parts no longer carry the old burdens – they can express their natural qualities of joy, creativity, spontaneity, curiosity, innocence, and wisdom. You might notice yourself laughing more easily, feeling more creative and inspired, experiencing deeper connection with others, responding to situations with wisdom rather than reacting from old wounds, and feeling more alive and authentic.',
            'Your protective parts transform into valuable allies rather than rigid controllers. The Perfectionist becomes discerning quality and excellence without shame. The People-Pleaser becomes genuine empathy and connection without losing yourself. The Controller becomes wise planning and organization without rigidity. The Critic becomes helpful discernment and high standards without self-attack. They retain their positive intentions while releasing extreme strategies.',
            'Daily integration practices become essential for maintaining and deepening your healing: Morning check-ins with your internal family – asking each part how they are and what they need, Gratitude practices for your parts\' contributions, Self-energy cultivation through meditation and mindfulness, Parts appreciation and acknowledgement, Regular journaling about internal experiences, and Celebration of healing milestones and insights.',
            'Creating a new internal family culture involves establishing new rules and ways of relating: All parts deserve respect and inclusion, Self leads with compassion and wisdom, Parts communicate openly and honestly, Conflicts are resolved through understanding rather than suppression, Vulnerability is safe and valued, Joy and play are encouraged and celebrated, Each part\'s gifts are utilized for the benefit of the whole system.',
            'Boundaries become healthier and more natural because they come from Self wisdom rather than fear. You can say no without guilt, set limits without shame, prioritize your needs without feeling selfish, and protect your energy without apology. Your healed system naturally knows what serves your wellbeing and what doesn\'t.',
            'Relationships transform as you bring your healed Inner Child to connections with others: You can be authentic and vulnerable without fear of rejection, Set and maintain healthy boundaries easily, Give and receive love freely without attachment issues, Express your needs and desires clearly, Resolve conflicts with wisdom and compassion, Experience deeper intimacy and connection, Share your authentic self without masks or pretense.',
            'Work and creativity flourish with your healed Inner Child\'s natural gifts: You can pursue your passions with enthusiasm and joy, Take creative risks without fear of failure, Work productively without perfectionistic paralysis, Collaborate effectively with others, Express your unique talents and gifts, Find meaning and purpose in your contributions, Experience flow states and deep satisfaction.',
            'Emotional regulation becomes natural as you work collaboratively with your parts: You can identify and name emotions accurately, Process feelings as they arise rather than suppressing, Self-soothe effectively when overwhelmed, Seek appropriate support when needed, Learn from emotions rather than being controlled by them, Experience the full range of human feelings without being flooded.',
            'The ongoing integration journey includes honoring setbacks as learning opportunities, continuing to build relationships with any new parts that emerge, deepening your Self leadership capacity through practice, sharing your healing journey with others who benefit, celebrating your progress and transformation, maintaining humility and curiosity about your internal world, and remembering that healing is an ongoing process of growth and discovery.',
            'Your healed Inner Child becomes one of your greatest resources – bringing playfulness, creativity, joy, spontaneity, innocence, and wisdom to every aspect of your life. Nurture this relationship and it will enrich your experience beyond measure.',
            'Living with your healed internal family is about co-creating a life that honors all parts of you while being led by the wisdom and compassion of Self. This integrated way of being brings more joy, authenticity, connection, and meaning than you may have thought possible.',
            'Remember that integration is not about perfection but about progress and relationship. There will be days when old patterns activate, when parts feel scared, when challenges arise. The difference is that now you have the tools, understanding, and internal support to navigate these experiences with wisdom and compassion rather than being overwhelmed by them.',
            'Your healed inner family becomes your greatest strength and resource – a team of dedicated, wise, and loving aspects working together to create a life of purpose, joy, and authentic expression.'
          ],
          bullets: [
            'Integration is an ongoing relationship practice, not a final destination',
            'Your healed Inner Child brings natural qualities of joy, creativity, and authenticity',
            'Protective parts transform into valuable allies while retaining their positive intentions',
            'Daily practices maintain and deepen your healing and integration',
            'Your internal family develops a new culture of collaboration and mutual respect',
            'Relationships, work, and emotional life all transform with your healed system',
            'Setbacks and challenges become learning opportunities rather than failures',
            'Your healed inner family becomes your greatest resource and strength'
          ],
          keyTakeaways: [
            'Living with your healed Inner Child brings spontaneous joy and creativity to daily life',
            'Your protectors become allies rather than controllers of your life experience',
            'Integration requires daily practice and ongoing relationship with your internal family',
            'Your healed system naturally creates healthier boundaries, relationships, and self-expression',
            'Challenges become opportunities to practice and deepen your Self leadership',
            'Your authentic self emerges naturally when old burdens are released',
            'The ongoing journey is about progress and relationship, not perfect performance',
            'Your healed inner family becomes a source of strength, wisdom, and joy in all areas of life'
          ],
          reflectionPrompts: [
            'What qualities of your healed Inner Child are you most excited to experience more fully?',
            'How might your daily life change with your protective parts working as allies rather than controllers?',
            'What integration practices feel most essential for maintaining your healing?',
            'How will you celebrate and honor your transformation and ongoing growth?'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-integration-complete',
          title: 'Inner Child Healing Journey Completed',
          description: 'You\'ve completed the foundational journey of Inner Child healing through IFS',
          completionMessage: 'Profound completion! You\'ve journeyed through the complete path of Inner Child healing through IFS – from understanding your internal system to releasing burdens and integrating wholeness. Whether or not you\'ve experienced full unburdening yet, you now understand the path, have built the foundation, and possess the tools for ongoing healing. Your Inner Child feels heard, your protectors trust your leadership, and your Self is ready to guide your internal family toward continued growth and joy.',
          nextSteps: [
            'Continue daily practices of Self leadership and parts connection to maintain and deepen your healing',
            'Consider working with an IFS therapist for deeper unburdening work and professional guidance',
            'Share your healing journey and wisdom with others who might benefit from your experience',
            'Document your transformation to remind yourself of your progress during challenging times',
            'Create ongoing rituals to honor your healed Inner Child and integrated internal family',
            'Stay curious about new parts or patterns that emerge – healing is an evolving process',
            'Celebrate how far you\'ve come and the transformation you\'ve already experienced',
            'Remember that your healed inner family is now your greatest resource for life\'s journey',
            'Continue learning and growing – there are always new depths to explore and integrate',
            'Trust your internal wisdom and the guidance of your Self as you navigate life\'s adventures'
          ],
          achievement: 'Inner Child Healing Master – Integrated Whole'
        }
      }
    ]
  },
  {
    id: 'module-5-bonus-exercises',
    order: 5,
    title: 'Module 5: Advanced Healing Exercises & Daily Practices',
    description: 'Collection of powerful therapeutic exercises, guided meditations, and daily practices to deepen your Inner Child healing journey',
    category: 'exercises',
    estimatedMinutes: 90,
    prerequisites: ['module-2-inner-child-wounds'],
    innerChildFocus: true,
    steps: [
      {
        type: 'activity',
        data: {
          id: 'activity-letter-to-inner-child',
          title: 'Letter Writing Exercise: Messages to Your Inner Child',
          description: 'Write a compassionate letter from your Adult Self to your wounded Inner Child',
          type: 'journaling',
          prompt: 'This powerful exercise involves writing a heartfelt letter from your wise, compassionate Adult Self to your Inner Child. Choose a specific age or wounded part that needs your attention. Write with unconditional love and understanding.',
          questions: [
            'Choose an age or specific Inner Child part you want to address. What wound does this part carry? (abandonment, shame, neglect, betrayal)',
            'Begin your letter: "Dear [name/age], I am writing to you because..." What do you want your Inner Child to know?',
            'Acknowledge their pain: "I know you went through..." Describe what happened to them with compassion.',
            'Validate their feelings: "It makes complete sense that you felt..." What emotions did they experience?',
            'Offer reassurance: "What happened was not your fault because..." Why wasn\'t it their fault?',
            'Express what you wish someone had told them: "I wish someone had said to you..." What did they need to hear?',
            'Make a commitment: "From now on, I promise to..." How will you care for this part going forward?',
            'End with words of love and acceptance. What closing message does your Inner Child most need?'
          ],
          interactiveElements: [
            'text-editor',
            'emotion-spectrum',
            'commitment-tracker'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-inner-child-visualization',
          title: 'Safe Place Visualization for Your Inner Child',
          description: 'Create a mental sanctuary where your Inner Child feels completely safe and loved',
          type: 'meditation',
          prompt: 'This guided visualization helps you create an internal safe space where you can meet and nurture your Inner Child. This becomes a refuge you can return to anytime your Inner Child needs comfort.',
          guidedSteps: [
            'Close your eyes and take three deep breaths. Allow your body to relax completely.',
            'Imagine yourself walking into a beautiful, peaceful place. This could be a forest, beach, meadow, or cozy room - wherever feels safest.',
            'Notice every detail of this safe space: the colors, sounds, smells, temperature, and textures around you.',
            'In this space, see your Inner Child approaching you. Notice their age, what they\'re wearing, and how they\'re feeling.',
            'Kneel or sit down to be at their eye level. Let them know they are completely safe with you.',
            'Ask your Inner Child: "What do you need right now?" Listen with your whole heart.',
            'Offer them whatever they need: a hug, words of comfort, play, or simply your calm presence.',
            'Tell your Inner Child: "I will never leave you. I am here now, and I will always protect you."',
            'Stay with them for as long as feels right. Let them know they can come here anytime they need you.',
            'When ready, give them a parting gift or symbol of your love that they can keep.',
            'Slowly return to present awareness, knowing you can visit this safe place anytime.'
          ],
          questions: [
            'Describe your safe place in detail. What makes it feel secure and nurturing?',
            'What age was your Inner Child when you met them? What emotions did they show?',
            'What did your Inner Child say they needed most? How did it feel to offer this?',
            'What gift or symbol did you give them? What does it represent?',
            'How do you feel now compared to before the visualization?'
          ],
          interactiveElements: [
            'guided-meditation',
            'safe-place-visualizer',
            'emotion-tracker'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-reparenting-dialogue',
          title: 'Reparenting Dialogue Exercise',
          description: 'Practice giving your Inner Child the responses they needed but never received',
          type: 'parts_work',
          prompt: 'In this exercise, you\'ll have a written dialogue between your Inner Child and your Wise Adult Self. The goal is to give your Inner Child the loving, validating responses they needed in childhood but may not have received.',
          questions: [
            'Think of a painful childhood memory. Inner Child, describe what happened and how you felt:',
            'Adult Self response: Validate their experience. What do you say to show you understand?',
            'Inner Child: Express your deepest fear or belief that came from this experience:',
            'Adult Self: Challenge this belief gently. What is the truth you want them to know?',
            'Inner Child: What did you need from the adults in your life that you didn\'t get?',
            'Adult Self: Commit to providing this now. How will you meet this need?',
            'Inner Child: What would help you feel safe enough to trust again?',
            'Adult Self: Make a specific promise. What can your Inner Child count on from you?',
            'Inner Child: Share one thing you\'re afraid to ask for or say out loud:',
            'Adult Self: Respond with unconditional love and acceptance. What is your message?'
          ],
          interactiveElements: [
            'dialogue-writer',
            'belief-challenger',
            'promise-tracker'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-body-connection',
          title: 'Body-Based Inner Child Connection',
          description: 'Use somatic awareness to connect with and heal your Inner Child',
          type: 'somatic',
          prompt: 'Our bodies hold the memories and emotions of childhood experiences. This exercise helps you use body awareness to connect with your Inner Child and release stored tension or pain.',
          guidedSteps: [
            'Sit or lie in a comfortable position. Close your eyes and take several slow breaths.',
            'Scan your body slowly from head to toe. Notice any areas of tension, tightness, pain, or discomfort.',
            'Choose one area that calls your attention. Place your hand gently on this area.',
            'Ask this part of your body: "What are you holding? What emotion lives here?"',
            'Listen for images, memories, or sensations that arise. Don\'t force anything.',
            'If a childhood memory or age comes up, invite that Inner Child to speak through this body part.',
            'Breathe compassion into this area. Imagine your breath bringing warmth and healing.',
            'Tell this body part and the Inner Child within it: "I hear you. I\'m here. It\'s safe to let go now."',
            'Continue breathing and offering compassion until you feel a shift or release.',
            'Thank your body and your Inner Child for communicating with you.',
            'Gently move this body part, shake it out, or stretch to complete the release.'
          ],
          questions: [
            'Which body area held the most tension or emotion? What did you discover there?',
            'What age or memory came up during the exercise? What emotions were stored?',
            'What message did your Inner Child communicate through your body?',
            'Did you experience any release or shift? Describe what happened.',
            'How does this body area feel now compared to before the exercise?',
            'What ongoing body awareness practice might help you stay connected to your Inner Child?'
          ],
          interactiveElements: [
            'body-scan-mapper',
            'emotion-spectrum',
            'somatic-release-tracker'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-daily-inner-child-checkin',
          title: 'Daily Inner Child Check-In Practice',
          description: 'Establish a daily practice of connecting with and caring for your Inner Child',
          type: 'daily_practice',
          prompt: 'Consistent daily connection with your Inner Child is one of the most powerful healing practices. Use this template to establish a morning and evening check-in ritual.',
          questions: [
            'MORNING CHECK-IN: Good morning, Inner Child. How are you feeling as we start this day?',
            'What do you need from me today to feel safe and cared for?',
            'Is there anything you\'re worried or scared about today? Let me address those fears.',
            'What would make today fun or joyful for you? How can we include some play?',
            'I want you to know that today I will... (make a specific commitment)',
            'EVENING CHECK-IN: How did you experience today, dear one? What was hard and what was good?',
            'Did I keep my promise to you? If not, what happened and how can I do better?',
            'What emotions came up today that we should acknowledge together?',
            'What are you grateful for from today, no matter how small?',
            'As we go to sleep, I want you to know... (offer comfort and safety for the night)'
          ],
          interactiveElements: [
            'daily-journal',
            'commitment-tracker',
            'gratitude-logger'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-trigger-response-plan',
          title: 'Trigger Response & Self-Soothing Plan',
          description: 'Create a personalized plan for responding to Inner Child triggers with compassion',
          type: 'planning',
          prompt: 'When your Inner Child gets triggered, having a pre-made plan helps you respond with compassion rather than react automatically. Create your personalized trigger response protocol.',
          questions: [
            'What are your top 3 Inner Child triggers? (situations, words, people, or events that activate old wounds)',
            'For each trigger, what wound gets activated? (abandonment, shame, neglect, betrayal)',
            'What are your physical warning signs that your Inner Child has been triggered? (racing heart, tension, shallow breathing)',
            'What are your emotional warning signs? (sudden fear, anger, sadness, shame)',
            'What are your behavioral warning signs? (withdrawing, people-pleasing, overreacting, numbing)',
            'Create a PAUSE protocol: When triggered, I will STOP and say to myself...',
            'BREATHE: Describe your grounding breath technique (e.g., 4-7-8 breathing, box breathing)',
            'ACKNOWLEDGE: What will you say to your Inner Child? "I see you are feeling... because..."',
            'SOOTHE: What physical comfort can you offer? (hand on heart, hug yourself, touch temple)',
            'SPEAK TRUTH: What corrective message does your Inner Child need to hear?',
            'TAKE ACTION: What healthy action can you take instead of reacting from the wound?',
            'List 5 emergency self-soothing techniques you can use anywhere (e.g., cold water, grounding, music)'
          ],
          interactiveElements: [
            'trigger-mapper',
            'soothing-toolkit',
            'emergency-plan-creator'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-exercises-complete',
          title: 'Advanced Exercises Mastered',
          description: 'You now have a complete toolkit of healing exercises and daily practices',
          completionMessage: 'Wonderful work! You now have a powerful collection of exercises and practices to support your ongoing Inner Child healing journey. These tools - letter writing, visualization, dialogue, body work, daily check-ins, and trigger response planning - give you everything you need to continue deepening your relationship with your Inner Child.',
          nextSteps: [
            'Choose 1-2 exercises that resonated most and commit to practicing them regularly',
            'Establish your daily morning and evening Inner Child check-in routine',
            'Keep your trigger response plan somewhere accessible for when you need it',
            'Consider creating a physical "Inner Child care kit" with comforting items',
            'Return to these exercises whenever you need deeper connection or healing',
            'Share these practices with others who might benefit from Inner Child work'
          ],
          achievement: 'Healing Practices Master – Daily Warrior'
        }
      }
    ]
  }
];

/**
 * Get a specific module by ID
 */
export function getModuleById(id) {
  return curriculumModules.find(m => m.id === id);
}

/**
 * Get modules by category
 */
export function getModulesByCategory(category) {
  return curriculumModules.filter(m => m.category === category);
}

/**
 * Check if prerequisites are met for a module
 */
export function checkPrerequisites(moduleId, completedModuleIds) {
  const module = getModuleById(moduleId);
  if (!module || !module.prerequisites) return true;
  
  return module.prerequisites.every(prereqId => completedModuleIds.includes(prereqId));
}

/**
 * Get the next recommended module based on completion
 */
export function getNextModule(completedModuleIds) {
  return curriculumModules.find(module => 
    !completedModuleIds.includes(module.id) && 
    checkPrerequisites(module.id, completedModuleIds)
  );
}

/**
 * Get all Inner Child focused modules
 */
export function getInnerChildModules() {
  return curriculumModules.filter(m => m.innerChildFocus);
}

/**
 * Get total estimated time for all modules
 */
export function getTotalEstimatedTime() {
  return curriculumModules.reduce((total, module) => total + module.estimatedMinutes, 0);
}