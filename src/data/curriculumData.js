/**
 * Enhanced IFS Curriculum Data for Self-Paced Learning
 * Structured as: Learn → Activity → Result with progression tracking
 * Focused on Inner Child healing through IFS methodology
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
  type: 'reflection', // 'reflection', 'journaling', 'parts_work', 'exercise', 'meditation', 'protocol'
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
  category: 'introduction', // 'introduction', 'parts_system', 'self_leadership', 'protocols', 'unburdening', 'integration'
  estimatedMinutes: 0,
  prerequisites: [],
  steps: [],
  innerChildFocus: false
};

// Enhanced curriculum modules with Inner Child focus
export const curriculumModules = [
  {
    id: 'module-1-intro-ifs',
    order: 1,
    title: 'Module 1: Introduction to IFS & Your Inner Child',
    description: 'Discover the foundational concepts of IFS and how your Inner Child parts shape your present experience',
    category: 'introduction',
    estimatedMinutes: 30,
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-what-is-ifs',
          title: 'What is Internal Family Systems?',
          content: [
            'Internal Family Systems (IFS) is a transformative approach to healing that recognizes your mind contains multiple parts, each with valuable qualities and protective intentions. This isn\'t a disorder—it\'s how we\'re all naturally designed.',
            'At the center of your internal system is your Self—your core essence embodying calmness, compassion, clarity, and confidence. Your Self is the natural leader your parts have been waiting for.',
            'Your Inner Child parts hold the emotions, beliefs, and memories from childhood. When these parts carry wounds, they influence your adult life in ways you may not realize—creating patterns in relationships, self-worth, and emotional responses.',
            'The beauty of IFS is that no part needs to be exiled or defeated. Every part, even those causing problems, is trying to help you in the only way it knows how. Healing comes from understanding and compassion, not internal warfare.'
          ],
          bullets: [
            'Your mind naturally has multiple parts—this is completely normal',
            'Each part has a positive intention, even when its behavior seems problematic',
            'Your Self is your compassionate core that can heal your Inner Child parts',
            'IFS is about internal relationships—helping your parts work together harmoniously'
          ],
          keyTakeaways: [
            'Your Inner Child parts carry authentic needs and emotions from childhood',
            'Understanding your internal family is the first step toward healing',
            'Your Self has the wisdom and compassion to lead your healing journey',
            'IFS provides a gentle, non-pathologizing approach to psychological healing'
          ],
          reflectionPrompts: [
            'How does it feel to consider that different parts of you might have different perspectives?',
            'What have you noticed about your own "inner child" - moments when you feel particularly young, vulnerable, or reactive?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-meet-inner-family',
          title: 'Meeting Your Inner Family',
          description: 'Begin to recognize the different voices and perspectives within you',
          type: 'reflection',
          prompt: 'Think about a recent situation where you felt conflicted or noticed different reactions inside yourself. This is your first glimpse at your internal family at work.',
          questions: [
            'Describe the situation: What was happening externally?',
            'What different thoughts, feelings, or impulses did you notice?',
            'Can you identify at least two distinct "voices" or perspectives? What did each one want?',
            'Did you notice any parts that seemed to be in conflict with each other?',
            'Looking back, can you sense which perspective felt more like your calm, core Self?',
            'Which reactions might be coming from your Inner Child parts?'
          ],
          interactiveElements: [
            'multi-select-perspectives',
            'emotion-spectrum',
            'age-identification'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-parts-awareness',
          title: 'Inner Family Awareness Unlocked',
          description: 'You\'ve begun the journey of recognizing your internal system and Inner Child parts',
          completionMessage: 'Congratulations! You\'ve taken the crucial first step in IFS and Inner Child healing: recognizing that you have parts, including your Inner Child. This awareness creates space for curiosity rather than judgment, and opens the door to compassionate internal relationships.',
          nextSteps: [
            'Pay attention throughout your day when you notice different parts activating',
            'Practice curiosity rather than judgment when Inner Child parts show up',
            'Remember: every part has a positive intention, especially your Inner Child',
            'Get ready to learn about the three main types of parts: Managers, Firefighters, and Exiles (Inner Child)'
          ],
          achievement: 'Inner Explorer'
        }
      }
    ]
  },
  {
    id: 'module-2-inner-child-wounds',
    order: 2,
    title: 'Module 2: Understanding Your Inner Child Wounds',
    description: 'Explore how childhood experiences create wounds that your Inner Child parts still carry today',
    category: 'parts_system',
    estimatedMinutes: 45,
    prerequisites: ['module-1-intro-ifs'],
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-inner-child-wounds',
          title: 'How Inner Child Wounds Form',
          content: [
            'Inner Child wounds are not flaws in your character—they are natural responses to overwhelming childhood experiences when you lacked the resources to process them fully. These wounds become burdens that your young, vulnerable parts (exiles) continue to carry.',
            'Common wounds include rejection, abandonment, neglect, criticism, shame, betrayal, humiliation, injustice, loss, and emotional invalidation. Each wound creates specific beliefs about yourself and the world that still influence your adult life.',
            'For example, a rejection wound might create beliefs like "I\'m unlovable" or "I must hide my true self." An abandonment wound might lead to fears of being left or difficulty trusting others. These beliefs aren\'t truth—they\'re burdens your Inner Child absorbed during overwhelming moments.',
            'Your protective parts (managers and firefighters) work tirelessly to prevent these wounded Inner Child parts from being triggered. This creates patterns like perfectionism, people-pleasing, emotional numbness, or explosive reactions that were originally designed to keep you safe but may now limit your life.'
          ],
          bullets: [
            'Inner Child wounds are natural responses to overwhelming childhood experiences',
            'These wounds create limiting beliefs that still affect your adult life',
            'Your protective parts work to keep these wounds hidden from consciousness',
            'Healing happens when your Self provides the safety and understanding your Inner Child needed'
          ],
          keyTakeaways: [
            'Your Inner Child parts are carrying pain, not pathology',
            'The burdens they carry are beliefs about unworthiness, not reality',
            'Your protective patterns were originally smart survival strategies',
            'Healing involves providing what your Inner Child needed but didn\'t receive'
          ],
          reflectionPrompts: [
            'What patterns in your adult life might be connected to childhood experiences?',
            'When do you notice yourself reacting like a younger version of yourself?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-identify-wounds',
          title: 'Identifying Your Inner Child Wounds',
          description: 'Gently explore which wounds your Inner Child parts may be carrying',
          type: 'parts_work',
          prompt: 'This is a gentle exploration of possible childhood wounds. Approach yourself with curiosity and compassion. If any exploration feels too intense, you can always pause and return to it later.',
          questions: [
            'Which of these common wounds resonates with you? (Rejection, Abandonment, Neglect, Criticism/Shame, Betrayal, Humiliation, Injustice, Loss, Emotional Invalidation, Trauma)',
            'For each wound that resonates: What childhood memories or feelings come up?',
            'What beliefs did you form about yourself from these experiences? (e.g., "I\'m unlovable," "I\'m too much," "I\'m not enough")',
            'How do these beliefs show up in your adult life? What patterns do you notice?',
            'Which protective strategies do you use to prevent these wounds from hurting? (perfectionism, people-pleasing, withdrawal, etc.)',
            'If you could go back to your younger self during those difficult moments, what would you want them to know?'
          ],
          interactiveElements: [
            'wound-selector',
            'belief-mapper',
            'pattern-identifier'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-wounds-identified',
          title: 'Inner Child Wounds Illuminated',
          description: 'You\'ve gained awareness of the wounds your Inner Child parts carry',
          completionMessage: 'Beautiful work! Identifying your Inner Child wounds is a profound act of self-compassion. You\'ve taken the first step in understanding that your adult patterns and struggles are rooted in childhood experiences, not personal failings. This awareness creates space for healing rather than self-criticism.',
          nextSteps: [
            'Notice when your Inner Child wounds get triggered in daily life',
            'Practice self-compassion when old patterns activate',
            'Begin building a relationship with the parts that protect these wounds',
            'Get ready to learn about your protective Manager parts and their valuable work'
          ],
          achievement: 'Wound Wisdom'
        }
      }
    ]
  },
  {
    id: 'module-3-protectors-unlocked',
    order: 3,
    title: 'Module 3: Understanding Your Protective System',
    description: 'Meet the Manager and Firefighter parts that protect your Inner Child wounds',
    category: 'parts_system',
    estimatedMinutes: 50,
    prerequisites: ['module-2-inner-child-wounds'],
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-managers',
          title: 'Your Manager Parts: The Proactive Protectors',
          content: [
            'Manager parts are the proactive protectors in your internal system. They work tirelessly, often from the moment you wake up, to prevent your Inner Child wounds from being triggered. These parts developed their strategies early in life based on what helped you stay safe, loved, or acceptable.',
            'Common Manager parts include: The Perfectionist ("If I\'m flawless, no one can criticize me"), The People-Pleaser ("If I make everyone happy, they won\'t reject me"), The Planner ("If I control everything, nothing bad will happen"), The Caretaker ("If I focus on others, I\'m valuable"), and The Critic ("If I judge myself first, others can\'t hurt me").',
            'Managers aren\'t trying to make your life rigid or joyless—they\'re desperately trying to protect vulnerable Inner Child parts from being hurt again. When you understand their protective mission, you can work with them rather than fighting against them.',
            'Your Managers are carrying the burden of constant vigilance. They believe that if they stop their protective strategies, the painful emotions and memories your Inner Child carries will overwhelm you. They need your reassurance that you, as Self, can handle these feelings.'
          ],
          bullets: [
            'Managers work proactively to prevent pain before it happens',
            'Their strategies (perfectionism, control, people-pleasing) made sense given your childhood experiences',
            'They fear that if they relax their vigilance, Inner Child pain will overwhelm you',
            'Healing involves building trust with Managers, not overpowering them'
          ],
          keyTakeaways: [
            'Your Manager parts are protective, not punitive—they\'re trying to keep you safe',
            'Their rigid strategies are actually attempts to protect your Inner Child',
            'They need to learn that your Self can handle the emotions they\'re protecting',
            'Appreciation and curiosity work better than resistance with Managers'
          ],
          reflectionPrompts: [
            'Which protective strategies do you notice yourself using regularly?',
            'What might these Manager parts be trying to protect you from?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-meet-managers',
          title: 'Meeting Your Manager Parts',
          description: 'Identify and build relationship with your proactive protectors',
          type: 'parts_work',
          prompt: 'Your Manager parts have been working hard to protect you for years. Now you have the opportunity to meet them with curiosity and appreciation, rather than frustration.',
          questions: [
            'What are the main ways you try to stay in control or prevent bad things from happening? (planning ahead, being perfect, pleasing others, analyzing everything, staying busy)',
            'Can you identify specific Manager parts? Give them descriptive names (like "The Perfectionist" or "The Planner")',
            'For each Manager: What is it trying to protect you from? What Inner Child wound is it guarding?',
            'How long has this Manager been working for you? Can you remember when it first took this job?',
            'What would this Manager need to hear from you to feel a little more relaxed? Can you express genuine appreciation for its hard work?',
            'If this Manager didn\'t have to work so hard, what might it enjoy doing instead?'
          ],
          interactiveElements: [
            'manager-identifier',
            'protection-mapper',
            'appreciation-generator'
          ]
        }
      },
      {
        type: 'learn',
        data: {
          id: 'learn-firefighters',
          title: 'Your Firefighter Parts: The Emergency Responders',
          content: [
            'Firefighter parts are the emergency responders of your internal system. Unlike Managers who try to prevent pain, Firefighters react when Inner Child wounds are already triggered and painful emotions are surfacing. Their sole mission is to extinguish the fire of painful feelings as quickly as possible.',
            'Common Firefighter strategies include: substance use (alcohol, food, drugs), dissociation or numbing out, compulsive behaviors (shopping, gaming, scrolling social media), rage or explosive anger, risky behaviors, and extreme withdrawal or isolation.',
            'Firefighters get activated when Managers can\'t prevent Inner Child pain from surfacing. They\'re like emergency medical technicians rushing in to sedate the system. While their methods may feel extreme or destructive, their intention is purely protective—they\'re trying to stop the pain.',
            'It\'s crucial to understand that Firefighters aren\'t "bad parts"—they\'re desperate parts doing their best with the tools they have. Judging or shaming them only makes them work harder to numb the resulting shame. They need to know there\'s a safer way to handle pain.'
          ],
          bullets: [
            'Firefighters activate when you\'re already overwhelmed with painful emotions',
            'Their extreme strategies are designed for immediate relief, not long-term solutions',
            'They often developed during times when you had no other way to cope with overwhelming pain',
            'They\'re trying to protect your Inner Child from feeling emotions that seem unbearable'
          ],
          keyTakeaways: [
            'Firefighters are emergency protectors, not self-destructive enemies',
            'Their extreme strategies make sense when you understand the pain they\'re managing',
            'They need your Self to provide a safer alternative for dealing with overwhelming emotions',
            'Compassion for Firefighters helps them trust that there\'s a better way'
          ],
          reflectionPrompts: [
            'What do you do when you feel overwhelmed by painful emotions?',
            'Which emergency coping strategies do you notice yourself using?'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-protectors-understood',
          title: 'Protector Partnership Formed',
          description: 'You\'ve identified and begun building relationship with your protective system',
          completionMessage: 'Excellent work! You\'ve identified the Manager and Firefighter parts that protect your Inner Child wounds. These parts have been carrying heavy burdens, working constantly to keep you safe. As you build relationship with them, they\'ll begin to trust that your Self can provide the safety and leadership they\'ve been seeking.',
          nextSteps: [
            'Continue noticing when your protectors activate—what triggers them?',
            'Practice thanking them for their hard work rather than fighting their strategies',
            'Ask your protectors what they need from you to feel more relaxed',
            'Get ready to learn the 6 F\'s protocol for building deeper relationships with all your parts'
          ],
          achievement: 'Protector Ally'
        }
      }
    ]
  },
  {
    id: 'module-4-self-leadership',
    order: 4,
    title: 'Module 4: Developing Self Leadership',
    description: 'Strengthen your core Self to lead your internal system with confidence and compassion',
    category: 'self_leadership',
    estimatedMinutes: 40,
    prerequisites: ['module-3-protectors-unlocked'],
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-eight-cs',
          title: 'The 8 C\'s: Qualities of Self-Energy',
          content: [
            'When your parts trust you enough to let you lead, your Self naturally emerges with eight beautiful qualities. These aren\'t qualities you need to achieve—they\'re who you naturally are when parts aren\'t overwhelming you. The 8 C\'s are: Curiosity, Compassion, Calm, Clarity, Confidence, Courage, Creativity, and Connectedness.',
            'Curiosity helps you understand your parts without judgment. Instead of asking "Why do I keep doing this?", you ask "What is this part trying to accomplish?" This openness creates safety for your parts to share their truth.',
            'Compassion is your ability to feel with your parts, especially your wounded Inner Child. This isn\'t pity—it\'s a deep recognition of their pain and the loving desire to provide what they needed but didn\'t receive.',
            'The other qualities emerge naturally as you build trust with your parts. Calm comes from knowing you can handle whatever comes up. Clarity allows you to see situations without the distortion of extreme emotions. Confidence grows as you successfully navigate challenges with your parts. Courage allows you to face difficult emotions. Creativity helps find new solutions. Connectedness reminds you that all parts belong to you.',
            'Your Self is the perfect parent your Inner Child always needed—calm, wise, loving, and capable of handling even the most difficult emotions.'
          ],
          bullets: [
            'The 8 C\'s are natural qualities of your Self, not achievements to earn',
            'Each C helps you build relationship with specific types of parts',
            'Self-energy grows as your parts learn to trust your leadership',
            'Your Self can provide the healing your Inner Child has been seeking'
          ],
          keyTakeaways: [
            'Self-energy isn\'t something you build—it\'s what emerges when parts relax',
            'The 8 C\'s work together to create confident, compassionate leadership',
            'Your Self is uniquely qualified to help your Inner Child heal',
            'Developing Self-leadership is about removing obstacles, not achieving qualities'
          ],
          reflectionPrompts: [
            'Which of the 8 C\'s feels most natural to you? Which feels most challenging?',
            'When do you notice yourself naturally in Self-energy? What helps that happen?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-cultivate-self',
          title: 'Cultivating Self-Energy',
          description: 'Practice accessing and strengthening your natural Self qualities',
          type: 'meditation',
          prompt: 'This meditation will help you access your Self-energy and strengthen the qualities that allow you to lead your internal system with confidence and compassion.',
          guidedSteps: [
            'Find a comfortable position and take three deep breaths, feeling your body settle.',
            'Bring to mind a recent moment when you felt relatively calm and centered. What did that feel like in your body?',
            'Now invite curiosity about your internal experience. Without judgment, notice what you\'re feeling and thinking.',
            'Place a hand over your heart and invite compassion for whatever is present. This includes your parts, your Inner Child, and yourself.',
            'Feel a sense of calm presence, like a wise parent sitting with upset children. You can handle whatever comes up.',
            'Recognize the clarity of seeing your experience without being completely merged with it.',
            'Connect with confidence in your ability to be with your parts and help them heal.',
            'Feel courage to face whatever emotions or memories may arise.',
            'Notice creativity in finding new ways to relate to your internal experience.',
            'Experience connectedness—knowing all parts belong to you and your internal family.',
            'Take a moment to appreciate your Self for being here, ready to lead with love and wisdom.',
            'When you feel complete, gently return to the room, carrying this Self-energy with you.'
          ],
          interactiveElements: [
            'guided-meditation',
            'self-energy-meter',
            'quality-reflection'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-self-strengthened',
          title: 'Self Leadership Activated',
          description: 'You\'ve strengthened your connection to Self and developed confidence to lead',
          completionMessage: 'Beautiful! You\'ve cultivated your Self-energy and developed confidence in your ability to lead your internal system. Your parts (especially your protectors) are sensing that you can provide the safety and wisdom they\'ve been seeking. Your Inner Child is beginning to trust that you can be the loving parent it always needed.',
          nextSteps: [
            'Practice brief Self-energy check-ins throughout your day',
            'When parts activate, invite them to step back so Self can lead',
            'Continue building trust with your protective system',
            'Get ready to learn the 6 F\'s protocol for systematic parts work'
          ],
          achievement: 'Self Leader'
        }
      }
    ]
  },
  {
    id: 'module-5-six-fs-protocol',
    order: 5,
    title: 'Module 5: The 6 F\'s Protocol',
    description: 'Master the systematic approach to working with your parts and healing your Inner Child',
    category: 'protocols',
    estimatedMinutes: 55,
    prerequisites: ['module-4-self-leadership'],
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-six-fs',
          title: 'The 6 F\'s: A Systematic Approach to Parts Work',
          content: [
            'The 6 F\'s protocol provides a systematic way to work with any part, especially your Inner Child parts. Each F builds on the previous one, creating a safe pathway to healing. The 6 F\'s are: Find, Focus, Flesh Out, Feel Toward, Befriend, and Fear.',
            'Find involves noticing when a part is active. You might hear it as a voice, feel it as a sensation, or notice it as a behavioral pattern. The key is to recognize that "something in you" is active rather than being completely merged with it.',
            'Focus means directing your compassionate attention to the part. This is like turning to face a family member who\'s trying to get your attention. You\'re giving the part your full, caring presence.',
            'Flesh Out is gathering information about the part. What does it look like? How old does it feel? What\'s its role? What is it trying to accomplish? What does it fear? This information helps you understand the part\'s perspective.',
            'Feel Toward involves noticing your emotional response to the part. Can you feel curiosity, compassion, or caring? Or do you notice judgment, frustration, or fear? Your emotional response tells you if you\'re in Self or if another part has taken over.',
            'Befriend is building relationship with the part. This involves expressing appreciation for its efforts, acknowledging its positive intention, and building trust. The part needs to know you understand and value it.',
            'Fear is asking the part what it\'s afraid would happen if it stopped its current role. This reveals the vulnerability it\'s protecting and helps you address its concerns directly.',
            'Throughout the 6 F\'s, if you notice you\'re not in Self, you simply pause and work with the part that has taken over before returning to the original part. This creates a foundation of trust and safety.'
          ],
          bullets: [
            'The 6 F\'s create safety and systematic progress in parts work',
            'Each F builds relationship and understanding with the part',
            'The protocol helps you stay in Self while working with difficult parts',
            'This approach is especially valuable for working with wounded Inner Child parts'
          ],
          keyTakeaways: [
            'The 6 F\'s provide a reliable framework for parts work',
            'Safety and trust are built through each step of the process',
            'Working systematically prevents overwhelm and retraumatization',
            'Your Inner Child parts need the structure and safety the 6 F\'s provide'
          ],
          reflectionPrompts: [
            'Which step of the 6 F\'s feels most important for your current work?',
            'How might the 6 F\'s help you work differently with challenging patterns?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-practice-six-fs',
          title: 'Practicing the 6 F\'s with a Part',
          description: 'Apply the 6 F\'s protocol to work with one of your parts',
          type: 'protocol',
          prompt: 'Choose a part that has been active recently. This could be a Manager, Firefighter, or Inner Child part. We\'ll walk through the 6 F\'s together to build relationship and understanding.',
          guidedSteps: [
            '**Find**: Notice which part you\'d like to work with. What are you aware of right now? A voice, feeling, sensation, or pattern?',
            '**Focus**: Direct your caring attention to this part. Give it your full presence.',
            '**Flesh Out**: Ask the part (with curiosity): What do you look like? How old do you feel? What\'s your role in my system? What are you trying to accomplish for me?',
            '**Feel Toward**: Notice your emotional response. Can you feel curiosity and compassion? Or is another part activated?',
            '**Befriend**: Express appreciation to the part. Say something like: "Thank you for working so hard to help me. I want to understand you better."',
            '**Fear**: Ask the part: "What are you afraid would happen if you stopped doing your job? What\'s the worst-case scenario you\'re preventing?"',
            'After completing the 6 F\'s, take a moment to notice what has shifted in your relationship with this part.'
          ],
          questions: [
            'What did you learn about this part through the 6 F\'s process?',
            'How did your relationship with this part change?',
            'What does this part need from you moving forward?',
            'How might working with this part differently affect your Inner Child wounds?'
          ],
          interactiveElements: [
            'six-fs-wizard',
            'part-dialogue',
            'relationship-tracker'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-six-fs-mastered',
          title: '6 F\'s Protocol Mastered',
          description: 'You\'ve learned the systematic approach to working with your parts',
          completionMessage: 'Congratulations! You\'ve mastered the 6 F\'s protocol—your go-to method for working with any part in your system. This systematic approach creates safety, builds trust, and provides structure for even the most challenging parts work. Your Inner Child parts especially benefit from this gentle, respectful approach.',
          nextSteps: [
            'Use the 6 F\'s regularly with active parts to build momentum',
            'Apply the protocol to your protective parts to strengthen their trust in Self',
            'Consider working with an IFS therapist for deeper Inner Child unburdening work',
            'Continue building your foundation for the sacred work of unburdening'
          ],
          achievement: 'Protocol Practitioner'
        }
      }
    ]
  },
  {
    id: 'module-6-inner-child-healing',
    order: 6,
    title: 'Module 6: Inner Child Unburdening & Integration',
    description: 'Learn the sacred process of healing your Inner Child wounds and living with integrated wholeness',
    category: 'unburdening',
    estimatedMinutes: 60,
    prerequisites: ['module-5-six-fs-protocol'],
    innerChildFocus: true,
    steps: [
      {
        type: 'learn',
        data: {
          id: 'learn-unburdening',
          title: 'Unburdening Your Inner Child',
          content: [
            'Unburdening is the sacred heart of IFS—where your Inner Child parts finally release the burdens they\'ve carried for years. These burdens are toxic beliefs and emotions absorbed during overwhelming experiences: "I\'m unlovable," "I\'m worthless," "It\'s all my fault," "I\'m too much," "I\'m invisible." These were never true about your parts— they were lies absorbed in moments of overwhelm.',
            'The unburdening process happens when your Inner Child part feels witnessed with compassion by your Self, trusts that you can handle its pain, and becomes ready to release these burdens. This isn\'t about talking the part out of its beliefs—it\'s about providing the loving, safe experience it needed but didn\'t receive when the burden was taken on.',
            'The process involves: 1) Getting permission from protectors to access the Inner Child, 2) Witnessing the part\'s story with compassion, 3) Helping the part leave the past situation, 4) Asking what burden it wants to release, 5) Choosing how to release it (light, water, earth, wind, fire), 6) Inviting in positive qualities to replace the burden.',
            'Unburdening creates profound transformation. Your Inner Child feels loved and safe for the first time. Protectors can finally relax their extreme jobs. Your whole system reorganizes around Self-leadership. You begin to experience life through the eyes of your wise, compassionate Self rather than through the filter of old wounds.',
            'This is sacred work that should be done carefully. While the principles can be learned and practiced, deep unburdening is ideally done with the guidance of a trained IFS therapist who can provide additional safety and support.'
          ],
          bullets: [
            'Unburdening helps Inner Child parts release toxic beliefs and emotions absorbed during trauma',
            'Burdens are not the part\'s true nature—they\'re what the part took on during overwhelming experiences',
            'The process requires permission from protectors and strong Self-leadership',
            'Unburdening creates system-wide transformation, not just individual part healing'
          ],
          keyTakeaways: [
            'Your Inner Child is ready to release the burdens it\'s been carrying',
            'Unburdening provides the loving corrective experience your Inner Child needed',
            'This sacred work transforms your entire internal system',
            'Integration is the natural result of successful Inner Child healing'
          ],
          reflectionPrompts: [
            'What burdens might your Inner Child be ready to release?',
            'What would your life look like without these old wounds?'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-prepare-unburdening',
          title: 'Preparing for Inner Child Unburdening',
          description: 'Assess readiness and create safety for profound healing work',
          type: 'parts_work',
          prompt: 'Unburdening your Inner Child is the most sacred work in IFS. Before proceeding, we need to ensure your protective system feels safe and you have strong Self-leadership. This preparation is crucial for creating the safety your Inner Child needs.',
          questions: [
            'Can you reliably access Self-energy? When parts activate, can you ask them to step back and feel the 8 C\'s emerge?',
            'Think of an Inner Child part carrying pain. Ask your Manager parts: "Are you comfortable with me connecting with this part?" What do they say?',
            'Ask your Firefighter parts the same question: "Are you okay with me approaching this wounded part?" What\'s their response?',
            'If any protectors have concerns, what do they need from you first? What assurances or commitments would help them feel safe?',
            'On a scale of 1-10, how much do you trust your Self to take care of this Inner Child and not get overwhelmed?',
            'What support do you have available (therapist, safe relationships) if this work brings up intense emotions?',
            'Are you prepared to be with whatever emotions or memories might arise without immediately trying to fix or numb them?'
          ],
          interactiveElements: [
            'readiness-assessment',
            'permission-seeker',
            'safety-planner'
          ]
        }
      },
      {
        type: 'learn',
        data: {
          id: 'learn-integration',
          title: 'Living with Your Healed Inner Child',
          content: [
            'After unburdening, integration is about living in a new way with your Inner Child and entire internal system. Your healed Inner Child no longer carries the old wounds—it can express its natural qualities of joy, creativity, spontaneity, and wisdom.',
            'Your protective parts can relax into new, healthier roles. The Perfectionist might become a helpful planner. The People-Pleaser might become a genuine connector. The Critic might become wise discernment. They retain their positive intentions but release their extreme strategies.',
            'Daily practices that support integration include: checking in with your parts, appreciating their contributions, making space for your Inner Child\'s play and creativity, and continuing to lead from Self when challenges arise.',
            'Your Inner Child becomes a source of wisdom, joy, and authentic expression rather than pain and reactivity. You might notice yourself laughing more easily, feeling more creative, experiencing deeper connection with others, and responding to situations with wisdom rather than reacting from old wounds.',
            'Integration isn\'t a destination—it\'s an ongoing process of living in relationship with your healed internal family. There will always be new layers of healing, new parts to meet, new challenges to navigate together. But you now have the foundation, tools, and confidence to lead with love and wisdom.',
            'Your healed Inner Child is one of your greatest assets—bringing creativity, joy, spontaneity, and authentic connection to your life. Nurture this relationship, and it will enrich every aspect of your journey.'
          ],
          bullets: [
            'Your healed Inner Child brings joy, creativity, and authentic expression',
            'Protector parts can relax into healthier roles while retaining their positive intentions',
            'Integration involves daily practices of connection and appreciation',
            'Your internal family becomes a source of strength rather than internal conflict'
          ],
          keyTakeaways: [
            'Living with your healed Inner Child brings spontaneous joy and creativity',
            'Your protectors become allies rather than controllers of your life',
            'Integration is an ongoing relationship, not a final destination',
            'Your healed internal family becomes your greatest strength and resource'
          ],
          reflectionPrompts: [
            'How might your daily life change with your Inner Child healed?',
            'What new qualities and gifts would your healed Inner Child bring?'
          ]
        }
      },
      {
        type: 'result',
        data: {
          id: 'result-integration-ready',
          title: 'Inner Child Healed & Integrated',
          description: 'You\'ve completed the foundational journey of Inner Child healing through IFS',
          completionMessage: 'Profound work! You\' completed the foundational journey of Inner Child healing through IFS. Whether or not you\'ve experienced full unburdening yet, you now understand the path, have built the foundation, and possess the tools for ongoing healing. Your Inner Child feels heard, your protectors trust your leadership, and your Self is ready to guide your internal family toward wholeness.',
          nextSteps: [
            'Continue daily practices of Self-leadership and parts connection',
            'Consider working with an IFS therapist for deeper unburdening work',
            'Celebrate how far you\'ve come and the transformation that\'s already occurred',
            'Share your journey with others who might benefit from Inner Child healing',
            'Remember that healing is ongoing—your internal family will continue to evolve and grow together'
          ],
          achievement: 'Inner Child Healer'
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