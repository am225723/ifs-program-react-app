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
            'self-energy-meter',
            'matching-exercise',
            'true-false-quiz',
            'emotion-wheel'
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
            'Welcome to this Cultivating Self Energy practice. Begin by finding a comfortable position \u2013 you may sit upright in a supportive chair with your feet flat on the floor, or lie down on your back with your arms resting gently at your sides. Allow your body to settle into whatever surface supports you. Feel the weight of your body being held. There is nothing you need to do right now, nowhere you need to be. Take a moment to honor yourself for choosing this time for your inner healing. If at any point during this meditation anything feels too intense, know that you can open your eyes, feel your feet on the ground, and return fully to the room. You are always in control. [Pause for 10 seconds]',
            'Let us begin with your breath \u2013 the bridge between your outer world and your inner landscape. Take a slow, deep breath in through your nose, filling your belly first, then your ribs, then your chest... hold gently at the top for a count of three... and now release fully through your mouth with an audible sigh, letting go of anything you no longer need. Again \u2013 breathe in deeply, feeling your body expand with fresh, nourishing air... hold... and release, feeling your shoulders drop, your jaw soften, your hands uncurl. One more time \u2013 a deep, slow inhale, drawing in peace and presence... hold... and a long, slow exhale, releasing tension, worry, and the busyness of the day. [Pause for 10 seconds]',
            'Now allow your breath to return to its natural rhythm. Begin to bring your awareness inward, like dimming the lights in a room so you can see the stars outside. Notice the surface beneath you \u2013 the texture, the temperature, the gentle pressure against your body. Feel your feet, your legs, your hips, your spine, your shoulders, your head \u2013 all being held and supported. Scan slowly through your body from the crown of your head down to the tips of your toes. Simply notice what is present without trying to change anything. Perhaps there is tension in your shoulders, a tightness in your chest, a heaviness in your belly. Whatever you find, greet it with a gentle nod of acknowledgment. These sensations are messages from your parts, and you are here to listen. [Pause for 15 seconds]',
            'As you settle deeper into this quiet inner space, I invite you to notice your internal landscape. Imagine that within you there is a vast, open space \u2013 like a sunlit meadow, a quiet temple, or a calm ocean. This is the space where your Self naturally resides. Your Self is not something you need to create or earn \u2013 it is your essential nature, the wise and loving core that has always been within you. As your parts begin to notice your presence here, some may feel curious, some may feel cautious, and some may feel relieved. Simply let them know that you are here, that you are settling in, and that everyone is welcome. [Pause for 10 seconds]',
            'We will now begin to access each of the eight qualities of Self energy, one at a time. Imagine each quality as a luminous light that already lives within you, waiting to be noticed and awakened. As we move through each one, allow yourself to feel it in your body, see it in your mind\'s eye, and let it gently fill your entire being. There is no right or wrong way to experience these qualities \u2013 simply remain open and curious about whatever arises. [Pause for 5 seconds]',
            'Let us begin with CURIOSITY. Imagine a warm, golden light beginning to glow softly in the center of your forehead \u2013 your mind\'s eye. This golden light represents your natural capacity for open, non-judgmental wondering. As it brightens, feel a gentle sense of openness spreading through your thoughts. Curiosity does not ask "Why am I like this?" from a place of frustration \u2013 it asks "I wonder what this part is trying to tell me?" with genuine warmth and interest. Feel this golden light of curiosity expanding outward, touching each thought and feeling with a gentle, welcoming glow. Notice how, when curiosity is present, even difficult experiences become interesting rather than threatening. Whisper internally: "I am curious about all of my experience." [Pause for 15 seconds]',
            'Now feel the golden light softening and transforming into a warm, rose-pink glow that settles into your heart center. This is COMPASSION \u2013 the tender, unconditional love that flows naturally from your Self toward every part of you, especially those who are hurting. Place your hand gently over your heart if that feels comfortable. Feel the warmth of your palm meeting the warmth of this rose-pink light. Compassion says to your wounded Inner Child parts: "I see your pain. It matters. You matter." Allow this soft, rosy light to expand with each breath, filling your chest, flowing down your arms and into your hands, radiating outward like heat from a hearth on a cold winter night. There is no part of you that is unworthy of this compassion \u2013 not the angry parts, not the ashamed parts, not the frightened parts. All are held in this tender glow. [Pause for 20 seconds]',
            'As the compassion settles deep within you, notice how a gentle, cool, silvery-blue light begins to emerge from the base of your spine and rises slowly upward like still water filling a vessel. This is CALM \u2013 not the absence of emotion, but the spacious capacity to be present with whatever arises without being swept away. Feel this silvery-blue calm spreading through your belly, soothing your nervous system, quieting the chatter of anxious parts. Imagine yourself as a deep, clear mountain lake \u2013 storms may move across the surface, but in the depths, all is still and undisturbed. Your parts can feel this calm, and it reassures them: "There is a steady, wise presence here who can hold all of this." Let this calm deepen with each slow exhale, like sinking gently into warm, still water. [Pause for 20 seconds]',
            'From within this deep calm, notice a clear, crystalline white light emerging behind your eyes, as if a fog has gently lifted to reveal a vast, clear sky. This is CLARITY \u2013 the ability to see your internal experience without being merged with it, to understand the difference between "I am sad" and "a part of me is carrying sadness." This crystalline light illuminates your inner landscape with gentle precision, helping you see patterns, understand motivations, and recognize the difference between past and present. With clarity, you can see that your protective parts are not enemies \u2013 they are loyal guardians working overtime. You can see that your wounded Inner Child parts are not broken \u2013 they are carrying burdens that were never theirs to carry. Allow this clear light to sharpen your inner vision, revealing truth with kindness. [Pause for 15 seconds]',
            'Now feel a steady, warm amber light glowing in your solar plexus \u2013 that center of personal power just above your navel. This is CONFIDENCE \u2013 not arrogance or bravado, but a deep, quiet knowing that you have within you everything your parts need. This amber light pulses gently with each heartbeat, affirming: "I can handle this. I have the wisdom, the love, and the patience to be with my parts, no matter what they carry." Feel this confidence as warmth and solidity in your core, like the trunk of an ancient oak tree \u2013 flexible enough to bend in strong winds yet rooted deeply in the earth. Your parts are watching, and as they feel this confidence, they begin to relax their desperate grip. They don\'t have to manage everything alone anymore. You are here. [Pause for 15 seconds]',
            'From this place of grounded confidence, sense a bright, fiery orange-red light kindling in the center of your chest, just behind your sternum. This is COURAGE \u2013 the willingness to face what is difficult, to turn toward pain rather than away from it, to sit with your Inner Child\'s tears without flinching. Courage is not the absence of fear \u2013 it is the choice to be present despite fear. This fiery light warms your entire torso, giving you the strength to say to your most wounded parts: "Show me. I can handle it. I will not look away." Feel this courage expanding, dissolving the walls that protective parts have built to keep you from your own depths. You are brave enough to feel. You are strong enough to heal. [Pause for 15 seconds]',
            'As courage settles into your being, notice a playful, shimmering violet-purple light beginning to dance and swirl around the crown of your head and through your imagination. This is CREATIVITY \u2013 the boundless capacity to envision new possibilities, to find fresh solutions to old problems, to imagine a life beyond the limitations of your wounds. This violet light sparkles and moves like the northern lights, reminding you that healing is not a rigid, linear process but a living, creative act. With creativity, you can find new ways to comfort your Inner Child, new metaphors for understanding your parts, new approaches when old strategies feel stuck. Allow this shimmering light to play freely through your mind, opening doors you didn\'t know existed. [Pause for 15 seconds]',
            'Finally, feel all of these lights \u2013 golden, rose-pink, silvery-blue, crystalline white, amber, fiery orange, and violet \u2013 beginning to swirl together in your heart center, blending and harmonizing into a luminous, warm, white-gold light. This is CONNECTEDNESS \u2013 the felt sense that all parts of you belong, that you are part of something larger, that no part of your internal family is excluded or forgotten. This white-gold light radiates outward from your heart in all directions, touching every part of your body, reaching every part within your system. Connectedness whispers: "We are all one family. Every part has a place. Every voice matters. We belong to each other." Feel this profound sense of wholeness and belonging settling into your bones, your muscles, your breath. [Pause for 20 seconds]',
            'Rest now in this integrated Self energy \u2013 all eight qualities alive and present within you simultaneously. Curiosity illuminating your mind, Compassion warming your heart, Calm steadying your nervous system, Clarity sharpening your vision, Confidence grounding your core, Courage strengthening your resolve, Creativity sparking your imagination, and Connectedness weaving it all together. This is who you truly are beneath the protective layers and the carried burdens. This is the Self your parts have been waiting for \u2013 the wise, loving leader who can guide your entire internal family toward healing. Take a moment to simply be in this fullness. [Allow 30 seconds of silence]',
            'From this place of integrated Self energy, gently send a wave of appreciation to all of your parts \u2013 the protectors who have worked so hard, the managers who have kept everything organized, the firefighters who have intervened in emergencies, and especially your wounded Inner Child parts who have carried so much pain with such extraordinary courage. Let each part know: "I see you. I appreciate you. I am here now, and together we will find a way through." Notice how your parts respond to this message. Some may feel relief, some may feel cautious, some may feel emotional. Whatever arises is welcome. [Pause for 15 seconds]',
            'Now, very gently, I invite you to create an anchor for this Self energy \u2013 something you can use to access it quickly throughout your day. Perhaps you press your thumb and forefinger together, or place your hand over your heart, or take one specific deep breath. Choose a small gesture that feels meaningful to you. As you make this gesture now, feel all eight qualities flooding through you. Practice this anchor three times: make the gesture, feel the Self energy, and release. This is your doorway back to Self, available to you in any moment, during any challenge. [Pause for 15 seconds]',
            'As we prepare to close this practice, take three slow, grounding breaths. With each inhale, draw this Self energy deeper into every cell of your body. With each exhale, release any remaining tension or resistance. Feel your feet on the floor or the surface beneath you. Wiggle your fingers and your toes. Notice the sounds in the room around you. Feel the temperature of the air on your skin. You are here, in the present moment, carrying all eight qualities of Self within you like a lantern that can never be extinguished. [Pause for 10 seconds]',
            'When you feel ready, gently open your eyes. Take a moment to look around the room and orient yourself to your surroundings. Notice how you feel compared to when you began \u2013 perhaps lighter, warmer, more spacious, more grounded. This Self energy is not something that comes and goes \u2013 it is always within you, always available, always waiting for you to turn inward and reconnect. Set an intention to check in with your Self energy at least three times today: once in the morning, once during a challenging moment, and once before sleep. Each time, use your anchor gesture to return to this luminous, integrated state. Your parts are counting on your leadership, and you have everything you need to provide it. Welcome home to your Self. [Pause for 10 seconds]'
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
            'Core childhood wounds include helplessness (feeling powerless or trapped), abandonment (fear of being left alone), neglect (not having basic needs met), criticism/shame (believing something is fundamentally wrong with you), betrayal (trust being broken by those who should protect you), humiliation (deep embarrassment that shaped self-concept), injustice (fairness violations that created bitterness), loss/grief (unprocessed death or separation trauma), emotional invalidation (being told your feelings are wrong), and various forms of abuse (physical, emotional, sexual).',
            'Each wound type creates specific limiting beliefs about yourself, others, and the world. A helplessness wound might generate beliefs like "Nothing I do matters," "I can\'t change anything," or "I\'m trapped and powerless." An abandonment wound might create "People always leave," "I can\'t trust anyone to stay," or "I must be self-sufficient to survive." These beliefs weren\'t true when they formed and they\'re not true now – but they feel absolutely real to the young parts carrying them.',
            'The impact of these wounds in adult life is profound and often unconscious. You might find yourself in relationship patterns that recreate childhood dynamics, career choices that compensate for perceived inadequacies, social behaviors that avoid triggering old wounds, or emotional reactions that seem disproportionate to current situations. Your Inner Child parts are essentially recreating opportunities to heal the original wounds, hoping for a different outcome this time.',
            'Your protective parts work tirelessly to prevent these wounds from being triggered. The Perfectionist Manager might say "If I\'m flawless, no one can criticize me" (protecting a shame wound). The People-Pleasing Manager might think "If I make everyone happy, they won\'t reject me" (protecting a rejection wound). The Controller Manager might believe "If I manage everything, nothing bad will happen" (protecting an abandonment wound). These strategies were smart survival adaptations, even if they limit your adult life.',
            'The challenge is that protective strategies often create the very outcomes they\'re trying to prevent. Perfectionism can lead to burnout and criticism from others. People-pleasing can result in resentment and eventual relationship breakdown. Control can create distance and push people away. Your protective parts are caught in impossible situations, trying to prevent old pain with strategies that don\'t work in adult contexts.',
            'Healing Inner Child wounds requires understanding their origins, validating the young parts\' experiences, helping them release the burdens they carry, and providing the loving corrective experiences they needed but didn\'t receive. This isn\'t about blaming parents or staying stuck in the past – it\'s about giving your young parts what they need now: safety, validation, love, and wise leadership.',
            'Your Adult Self has the capacity to provide everything your Inner Child needed: unconditional love, emotional validation, protection, guidance, and the wisdom to help them understand that childhood experiences weren\'t their fault. As you build this relationship, your young parts can finally release burdens they\'ve carried for decades.',
            'The healing journey involves compassionately understanding your wounds, building trust with protective parts, accessing wounded young parts with Self energy, facilitating unburdening (release of toxic beliefs and emotions), and integrating healed parts into your internal family. This creates profound transformation not just in individual symptoms but in your entire experience of life.',
            'Understanding your specific wound patterns is crucial for targeted healing. Each wound type requires different approaches and different types of corrective experiences. Helplessness wounds need experiences of agency and empowerment. Abandonment wounds need consistent presence and reliability. Shame wounds need validation and non-judgment. Your Self can provide all of these.',
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
            'HELPLESSNESS: "Nothing I do matters" - Have you experienced: feeling powerless to change your situation, freezing under pressure, giving up because nothing ever changes, feeling trapped in painful patterns?',
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
            'guided-visualization',
            'healing-moments-journal',
            'letter-to-parts',
            'scenario-cards'
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
            'HELPLESSNESS WOUNDS require experiences of agency, empowerment, and choice. Healing involves: recognizing moments where you do have power, celebrating small victories and successful choices, building confidence through incremental action, reclaiming your voice and assertiveness, and understanding that as an adult you have options your child self did not. The antidote to helplessness is empowered action.',
            'ABANDONMENT WOUNDS need reliability, consistency, and secure attachment. Healing includes: keeping promises to yourself, building relationships with reliable people, creating daily routines that provide stability, developing internal resources to soothe abandonment panic, and understanding that your Self will never abandon your parts. The antidote is secure, consistent presence.',
            'NEGLECT WOUNDS require attentive care, validation of needs, and nurturing. Healing involves: learning to identify and honor your physical/emotional needs, creating daily self-care rituals, seeking out nurturing relationships and experiences, allowing yourself to be cared for by others, and providing the loving attention your childhood lacked. The antidote is consistent, loving care.',
            'CRITICISM/SHAME WOUNDS need validation, non-judgment, and inherent worth recognition. Healing includes: practicing radical self-compassion, surrounding yourself with non-judgmental people, challenging the inner critic with Self energy, understanding that your worth isn\'t tied to performance, and embracing imperfection as part of being human. The antidote is unconditional positive regard.',
            'BETRAYAL WOUNDS require rebuilding trust, setting boundaries, and discernment. Healing involves: learning to trust your own wisdom and intuition, setting and maintaining healthy boundaries, working through forgiveness in your own timing, building relationships with trustworthy people, and understanding that betrayal reflects others\' limitations, not your worth. The antidote is trustworthy connection.',
            'HUMILIATION WOUNDS need dignity restoration, privacy respect, and vulnerability safety. Healing includes: reclaiming your dignity and self-respect, choosing carefully who sees your vulnerable side, practicing self-compassion for embarrassing moments, understanding that vulnerability is strength when shared safely, and creating spaces where you can be authentic without fear. The antidote is honored vulnerability.',
            'INJUSTICE WOUNDS need fairness validation, appropriate anger expression, and empowerment. Healing involves: validating that unfair things really did happen, finding healthy ways to express anger and frustration, advocating for yourself and others, creating your own sense of justice and integrity, and understanding that you don\'t need others to admit wrongdoing to heal. The antidote is empowered authenticity.',
            'LOSS/GRIEF WOUNDS require space for mourning, ritual, and continued connection. Healing includes: allowing yourself to fully grieve without timeline pressure, creating rituals to honor what was lost, finding ways to maintain meaningful connection with those/what you\'ve lost, understanding that grief is love with nowhere to go, and building new relationships while honoring old connections. The antidote is honored mourning.',
            'EMOTIONAL INVALIDATION WOUNDS need emotional literacy, validation, and permission to feel. Healing involves: learning to identify and name your emotions accurately, validating all your feelings as important signals, finding safe spaces for emotional expression, understanding that emotions have wisdom even when they\'re uncomfortable, and developing internal permission to feel everything. The antidote is emotional wisdom.',
            'For all wound types, the foundation of healing is your Self providing consistent, compassionate leadership. Your young parts need to know that you can handle their pain, won\'t abandon them when they\'re upset, and will advocate for their needs. This internal secure attachment is what allows deep unburdening to occur.',
            'Targeted healing also involves recognizing when multiple wounds overlap and interact. Helplessness and shame often combine, as do abandonment and neglect. Understanding these patterns helps you provide comprehensive healing that addresses the complexity of your actual experience.',
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
            'progress-tracker',
            'fill-in-blank'
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
            'trust-building-planner',
            'scale-rating',
            'parts-dialogue',
            'fill-in-blank'
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
            'trust-building-exercises',
            'true-false-quiz'
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
            'daily-commitment-planner',
            'safety-checklist',
            'drag-to-rank',
            'letter-to-parts'
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
    woundPersonalization: {
      abandonment: {
        childName: 'Lonely Child',
        moduleIntro: 'This module is personalized for your abandonment wound. You will apply the 6 F\'s protocol specifically to your Lonely Child — the part that carries fear of being left, rejected, or forgotten. Each step is adapted to help you build the internal secure attachment your Lonely Child has always needed.',
        selfCsIntegration: 'The 8 C\'s of Self — Curiosity, Compassion, Calm, Clarity, Confidence, Courage, Creativity, and Connectedness — are the foundation of the 6 F\'s. For abandonment wounds, Compassion and Connectedness are your most powerful allies. When your Lonely Child fears being left again, your Self\'s Compassion says "I will never leave you" and your Connectedness reminds it that belonging is your birthright.',
        guidedSteps: [
          '**FIND** (with Curiosity): Notice your Lonely Child. Where does abandonment live in your body? Perhaps a hollow ache in your chest, a clenching in your stomach, or a desperate reaching in your arms. Say to yourself: "Something in me is afraid of being left." Let Curiosity guide you — "I wonder what this part needs to show me today."',
          '**FOCUS** (with Calm & Connectedness): Turn your full, steady attention to your Lonely Child. Imagine sitting beside this young part — not rushing to fix, not pulling away. Your Calm presence says: "I\'m here. I\'m not going anywhere." This consistent, patient Focus is the opposite of what abandonment taught — someone is finally staying.',
          '**FLESH OUT** (with Curiosity & Clarity): Ask your Lonely Child with genuine Curiosity: "How old are you? What moment are you stuck in? Who left, and what did you decide it meant about you?" Listen for beliefs like "I\'m too much," "I\'m not enough to keep people," or "Everyone leaves eventually." Let Clarity help you see these as burdens, not truths.',
          '**FEEL TOWARD** (with Compassion — the 8 C\'s checkpoint): This is your most important step. Check: Can you feel genuine Compassion for this Lonely Child? Or does another part jump in — maybe a protector saying "Stop being so needy" or "Don\'t be weak"? If so, thank that protector and ask it to step back. Your Lonely Child needs your Compassion, not more rejection from within.',
          '**BEFRIEND** (with Courage & Connectedness): This takes Courage — offering the very thing your Lonely Child fears it will never receive. Say: "I see how long you\'ve waited for someone to stay. I\'m here now, and I\'m not leaving. You are not too much. You deserve to be held." Feel the Connectedness between your Self and this part.',
          '**FEAR** (with Calm & Clarity): Ask gently: "What are you most afraid of? What would happen if everyone left?" Listen without trying to talk the part out of its fear. Common abandonment fears: "I\'ll be completely alone," "I\'ll die without connection," "There\'s something fundamentally unlovable about me." Hold these fears with Calm. Your Clarity knows: these fears are real to this part, but they are not the whole truth.',
          'Close by making a specific promise to your Lonely Child — a daily ritual of connection. This part heals through consistent, reliable presence, not grand gestures. "I will check in with you every morning. You are never alone inside."'
        ],
        reflectionPrompts: [
          'What did your Lonely Child reveal about its deepest fear of abandonment? How old did it feel?',
          'Which of the 8 C\'s felt easiest to bring to your Lonely Child? Which C\'s did protectors block?',
          'What promise did you make to your Lonely Child? How will you keep this commitment daily?',
          'How did it feel to be the one who stays? What shifted in your body when you offered consistent presence?',
          'What protector parts tried to interrupt the 6 F\'s process? What were they afraid of?'
        ]
      },
      shame: {
        childName: 'Unworthy Child',
        moduleIntro: 'This module is personalized for your shame wound. You will apply the 6 F\'s protocol specifically to your Unworthy Child — the part that carries the belief "I am fundamentally flawed." Each step is adapted to gently approach this deeply hidden part and begin replacing toxic shame with inherent worthiness.',
        selfCsIntegration: 'The 8 C\'s of Self are essential for shame work because your Unworthy Child has been told it doesn\'t deserve Compassion or Curiosity — only judgment. For shame wounds, Compassion is revolutionary (it directly contradicts the shame message) and Courage is vital (approaching shame requires bravery because the Inner Critic will fight hard to keep shame hidden). Creativity helps find new ways to see yourself beyond the shame story.',
        guidedSteps: [
          '**FIND** (with Curiosity, not judgment): Notice your Unworthy Child. Shame often hides — it may show up as heat in your face, a desire to disappear, a sinking feeling in your gut, or a voice that says "don\'t look here." Your Inner Critic may try to redirect you. Gently say: "Something in me carries shame. I\'m curious about this part, not here to judge it."',
          '**FOCUS** (with Compassion & Calm): Turn toward your Unworthy Child with the warmest, most unconditional attention you can offer. This part expects judgment — your Compassionate Focus is startling and healing. Imagine looking at this child the way a perfectly loving parent would: with complete acceptance. Let Calm steady you if shame waves intensify.',
          '**FLESH OUT** (with Curiosity & Courage): It takes Courage to ask the shame questions. Ask your Unworthy Child: "What do you believe is wrong with you? Who first made you feel this way? What experience taught you that you are flawed?" Listen for the core shame beliefs: "I\'m broken," "I\'m disgusting," "If people really knew me, they\'d leave." These are burdens, not truths about who you are.',
          '**FEEL TOWARD** (with Compassion — the 8 C\'s checkpoint): The critical checkpoint for shame. Can you feel Compassion for this child who has believed they are fundamentally defective? Or does the Inner Critic hijack this step with "You should be ashamed of being ashamed"? If judgment arises, that\'s a protector — thank it and ask it to step back. Your Unworthy Child needs to be met with the Compassion it has never received.',
          '**BEFRIEND** (with Courage & Creativity): This requires the most Courage — looking directly at your Unworthy Child and saying what it has never heard: "There is nothing wrong with you. You were never broken. What happened to you was wrong, but you are not wrong." Use Creativity to find the words this specific child needs. Perhaps: "You are worthy exactly as you are, without earning it."',
          '**FEAR** (with Calm & Clarity): Ask: "What are you afraid people would see if they really looked? What\'s the worst thing about you that you\'re trying to hide?" These fears are the core of toxic shame. Hold them with Calm — not dismissing them, but not agreeing either. Clarity reveals: these beliefs were installed by others; they were never your truth.',
          'Close by placing one hand on your heart. Let your Self whisper to your Unworthy Child: "You are not what happened to you. You are not what they said about you. You are worthy of love — not because of what you do, but because of who you are."'
        ],
        reflectionPrompts: [
          'What core shame belief did your Unworthy Child reveal? Where did it originate?',
          'How did the Inner Critic try to interfere during the 6 F\'s? What was it protecting?',
          'Which of the 8 C\'s felt hardest to bring to shame work? Why do you think that is?',
          'What shifted when you told your Unworthy Child there is nothing wrong with them?',
          'How can you practice seeing yourself through Compassion rather than the Critic\'s eyes this week?'
        ]
      },
      neglect: {
        childName: 'Lost Child',
        moduleIntro: 'This module is personalized for your neglect wound. You will apply the 6 F\'s protocol specifically to your Lost Child — the part that learned to disappear, minimize needs, and take up as little space as possible. Each step is adapted to help you find and reconnect with a part that became expert at being invisible.',
        selfCsIntegration: 'The 8 C\'s of Self are especially healing for neglect because your Lost Child has never experienced someone bringing Curiosity to their inner world. For neglect wounds, Curiosity says "I want to know you" (the opposite of being ignored), and Calm provides the steady attention this child was never given. Connectedness reminds the Lost Child that wanting to be seen is natural and healthy, not "too much."',
        guidedSteps: [
          '**FIND** (with Curiosity & patience): Your Lost Child may be the hardest part to find — they became expert at hiding and not taking up space. Look for: numbness, blankness, the feeling of "nothing\'s wrong," or a quiet emptiness. These are signs your Lost Child is nearby but invisible. Say with genuine Curiosity: "I know there\'s a part of me that learned to disappear. I\'m looking for you now."',
          '**FOCUS** (with Calm & Connectedness): When you locate your Lost Child, give it the one thing it has never received: your full, undivided attention. Not rushed, not distracted — truly present. This part may test you by retreating further. Stay. Your Calm says "I have time for you." Your Connectedness says "I see you, and I\'m not looking away."',
          '**FLESH OUT** (with Curiosity): Ask your Lost Child with warm Curiosity: "How old are you? What was it like to be invisible? What did you need that nobody noticed? What did you stop asking for because no one was listening?" Listen for beliefs like "My needs don\'t matter," "I\'m invisible," "I\'d better not bother anyone." These are survival strategies, not truths.',
          '**FEEL TOWARD** (with Compassion — the 8 C\'s checkpoint): Can you feel genuine Compassion for a child who learned their needs don\'t matter? Or does a protector part say "Stop making a big deal out of nothing" or "Other people had it worse"? These minimizing parts protect the Lost Child from the pain of acknowledging what was missing. If they arise, thank them and gently ask: "Can you let me see this child?"',
          '**BEFRIEND** (with Courage & Creativity): Tell your Lost Child what they have waited their whole life to hear: "I see you. You matter. Your needs are real and important. You are not invisible to me." Use Creativity to show up in the specific way this child needed: perhaps holding them, sitting with them quietly, or asking "What do you need right now?" — a question nobody asked.',
          '**FEAR** (with Calm & Clarity): Ask: "What are you afraid of if you let yourself be seen? What happens if you admit you have needs?" Common neglect fears: "My needs will burden people," "If I ask, I\'ll be rejected or ignored again," "I don\'t deserve to take up space." Hold these with Calm. Clarity reveals: these fears were learned; your right to have needs was never actually negotiable.',
          'Close with a specific self-attunement practice. Ask your Lost Child right now: "What do you need from me today?" Then provide it. This daily practice of noticing and meeting your own needs is how your Lost Child learns it truly matters.'
        ],
        reflectionPrompts: [
          'Was your Lost Child hard to find? What did the "invisibility" feel like in your body?',
          'What needs did your Lost Child reveal that had been buried? How old is this neglect pattern?',
          'Which of the 8 C\'s felt most healing for your Lost Child? Which felt unfamiliar?',
          'What happened inside you when you said "You matter" to the part that learned to disappear?',
          'What is one need you will practice meeting for yourself this week?'
        ]
      },
      betrayal: {
        childName: 'Terrified Child',
        moduleIntro: 'This module is personalized for your betrayal wound. You will apply the 6 F\'s protocol specifically to your Terrified Child — the part that experienced violation of trust and now guards against further betrayal. Each step is adapted to honor this part\'s need for safety above all else.',
        selfCsIntegration: 'The 8 C\'s of Self are critical for betrayal work because trust itself was weaponized against your Terrified Child. For betrayal wounds, Calm is essential (this part\'s nervous system is hyperactivated), and Courage allows you to approach terror without running. Clarity helps distinguish past danger from present safety, and Confidence gradually builds trust that your Self is a reliable, safe leader — unlike whoever betrayed this part.',
        guidedSteps: [
          '**FIND** (with Calm & Curiosity): Your Terrified Child may be behind layers of hypervigilant protectors. Look for: body tension, scanning for danger, difficulty relaxing, or a pit of dread in your stomach. Before approaching the Terrified Child, first acknowledge its protectors: "I see the parts that are keeping watch. Thank you for your vigilance. I\'d like to gently approach the part they\'re protecting."',
          '**FOCUS** (with Calm — this is paramount): Your Terrified Child needs Calm above all else. Approach slowly, like approaching a frightened animal. If you move too fast, protectors will slam the door. Let your Focus be steady but gentle, predictable but not intense. Your Calm says: "There is no rush. You set the pace. I will not push past your boundaries."',
          '**FLESH OUT** (with Curiosity & Courage): If your Terrified Child is willing, ask very gently: "What happened to you? Who broke your trust? What did you learn about the world from that experience?" This takes Courage — the answers may be painful. Listen for beliefs like "No one can be trusted," "Love is dangerous," "If I let my guard down, I\'ll be hurt again." These are survival lessons, not eternal truths.',
          '**FEEL TOWARD** (with Compassion — the 8 C\'s checkpoint): Can you feel Compassion for a child whose trust was violated? Or does a protector leap in with "Don\'t be vulnerable — that\'s how you got hurt"? Hypervigilant parts work hard to prevent this step. If they activate, honor them: "I understand why you don\'t want us to be open. What happened was real. But I need to reach the child you\'re protecting."',
          '**BEFRIEND** (with Confidence & Courage): This is the step where you become the trustworthy presence your Terrified Child never had. Say: "I am not going to hurt you. I am not going to betray you. I know someone did, and that was not okay. But I am safe. I am your Self — the one presence that will never violate your trust." Build Confidence slowly, through consistent small acts of reliability.',
          '**FEAR** (with Calm & Clarity): Ask: "What are you most afraid will happen if you trust again? What is the worst-case scenario you\'re preventing?" Betrayal fears run deep: "I\'ll be used again," "Love is a trap," "If I open up, I\'ll be destroyed." Hold these with profound Calm. Clarity whispers: past betrayal was real, but your Self has the power to create safety now.',
          'Close with a safety commitment. Tell your Terrified Child: "I will never force you to trust before you\'re ready. You decide the pace. I will prove my reliability to you through consistent, gentle action — not words alone." This part heals through earned trust, demonstrated over time.'
        ],
        reflectionPrompts: [
          'How did your hypervigilant protectors respond when you tried to reach the Terrified Child?',
          'What beliefs about trust did your Terrified Child reveal? Where did they come from?',
          'Which of the 8 C\'s felt most important for your Terrified Child? Why?',
          'What did it feel like to tell your Terrified Child that your Self is safe and will not betray them?',
          'How can you demonstrate trustworthiness to this part through small, consistent actions this week?'
        ]
      },
      helplessness: {
        childName: 'Powerless Child',
        moduleIntro: 'This module is personalized for your helplessness wound. You will apply the 6 F\'s protocol specifically to your Powerless Child — the part that learned "nothing I do matters" and gave up trying to affect the world around it. Each step is adapted to gently reawaken this part\'s sense of agency and personal power.',
        selfCsIntegration: 'The 8 C\'s of Self are transformative for helplessness because your Powerless Child has never experienced being led by someone capable and effective. For helplessness wounds, Confidence is the most healing C — it demonstrates that your Self IS capable, even when parts feel stuck. Courage says "I will try, even when it feels pointless." Creativity opens doors the Powerless Child believes are permanently closed.',
        guidedSteps: [
          '**FIND** (with Curiosity): Your Powerless Child may show up as: freeze, collapse, "what\'s the point?" thinking, going blank when decisions arise, or a heavy resignation in your body. It often looks like passivity or apathy. Say with Curiosity: "Something in me has given up. I wonder when this part learned that trying was useless."',
          '**FOCUS** (with Confidence & Calm): Direct your attention to your Powerless Child with an important new quality: Confidence. Not arrogant confidence — the quiet Confidence of a Self that knows it can handle what comes. Your Calm says: "I\'m here." Your Confidence adds: "And I\'m capable." This combination is what your Powerless Child has never witnessed from a caretaker.',
          '**FLESH OUT** (with Curiosity & Clarity): Ask your Powerless Child: "What made you give up? When did you learn that nothing you did mattered? What happened when you tried to make things better and failed?" Listen for beliefs like "I can\'t change anything," "My voice doesn\'t matter," "Why bother trying?" Clarity helps you see: these were true in the original situation, but they are not true now.',
          '**FEEL TOWARD** (with Compassion — the 8 C\'s checkpoint): Can you feel Compassion for a child who was stripped of agency? Or does a protector say "Stop being lazy" or "Just try harder"? These parts misunderstand helplessness as a character flaw rather than a survival response. If judgment arises, gently redirect: "This child didn\'t choose to give up. They were taught that their efforts were meaningless."',
          '**BEFRIEND** (with Courage & Creativity): This takes Courage — making promises to a part that has been disappointed before. Say: "I see that you stopped trying because trying led to nothing. That made sense then. But I am here now, and I am capable. Together, we can make choices that matter. You don\'t have to do it alone anymore." Use Creativity to imagine what agency could look like — even small choices count.',
          '**FEAR** (with Calm & Clarity): Ask: "What are you afraid would happen if you tried and failed again? What\'s scarier — staying stuck or risking disappointment?" Common helplessness fears: "I\'ll try and nothing will change again," "I\'ll look foolish for hoping," "The world will just knock me down." Calm holds these fears. Clarity reveals the crucial difference: your Self now has resources your Powerless Child never had.',
          'Close with a small, achievable act of agency — right now, in this moment. Ask your Powerless Child: "What is one tiny choice we can make together today?" Make it. Celebrate it. This part heals not through big transformations but through accumulated evidence that their actions create real effects.'
        ],
        reflectionPrompts: [
          'What experience taught your Powerless Child that their efforts were meaningless?',
          'How did it feel to bring Confidence (the C) to a part that has only known powerlessness?',
          'Which of the 8 C\'s does your Powerless Child need most right now? Why?',
          'What small act of agency did you and your Powerless Child practice? How did it feel?',
          'Where in your daily life do you still defer, comply, or give up? What could you choose differently?'
        ]
      }
    },
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
            'self-leadership-monitor',
            'mindfulness-timer',
            'drag-to-rank',
            'parts-dialogue'
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
        type: 'activity',
        data: {
          id: 'activity-guided-parts-dialogue',
          title: 'Guided Parts Dialogue with Your Therapist',
          description: 'A structured exercise for therapist-guided conversation with your internal parts using the IFS protocol',
          type: 'parts_work',
          prompt: 'This exercise is designed for use during a therapy session. Your therapist will guide you while you turn inward to connect with parts. The dialogue follows the IFS protocol: Find, Focus, Flesh out, Feel toward, BeFriend, and Fear. Work through each question with your therapist present to maintain Self-energy and ensure safety.',
          questions: [
            'FIND: Close your eyes and notice what part is most present right now. Where do you feel it in your body? What does it look like if you could see it? Describe everything you notice to your therapist.',
            'FOCUS: Turn your full attention to this part. What emotion is it carrying? How old does it seem? What posture or expression does it have? Stay curious and describe what you observe.',
            'FLESH OUT: Ask the part: "What do you want me to know about you? What is your job in my system?" Listen without judging. Share what you hear with your therapist. Let the part tell its full story.',
            'FEEL TOWARD: How do you feel toward this part right now? If you feel anything other than curiosity and compassion (frustration, fear, judgment), notice that another part has stepped in. Ask that part to step back so you can be with the target part from Self.',
            'BEFRIEND: Tell this part: "I appreciate you. I understand why you do what you do. Thank you for trying to help me." Notice how the part responds when it feels seen and appreciated. What shifts?',
            'FEAR: Ask the part: "What are you most afraid would happen if you stopped doing your job?" This reveals the exile or wound the protector is guarding. Share what comes up with your therapist.',
            'DEEPER CONNECTION: Ask: "What do you need from me that you have not been getting?" Listen carefully. This often reveals what the part needs to begin relaxing its extreme role.',
            'THERAPIST CHECK-IN: Share with your therapist what you have learned. Together, discuss what this part needs and what the next step might be. Does the part want to show you more? Does it need more trust-building first?',
            'CLOSING: Thank the part for being willing to share with you today. Let it know you will come back. Ask if there is anything else it needs before you close. Take three deep breaths to return to the room.'
          ],
          interactiveElements: [
            'parts-dialogue-tracker',
            'emotion-spectrum',
            'body-scan-mapper'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-protector-negotiation',
          title: 'Negotiating with Protective Parts',
          description: 'Work with your therapist to help Manager and Firefighter parts feel safe enough to allow access to vulnerable exiles',
          type: 'parts_work',
          prompt: 'Protectors often block access to wounded parts because they fear the pain will be overwhelming. This exercise helps you and your therapist respectfully negotiate with these protective parts, building trust so they can eventually allow healing work with the exiles they guard. Never force past a protector — earn its trust.',
          questions: [
            'IDENTIFY THE GATEKEEPER: Which protective part is currently active? Is it a Manager (controlling, planning, criticizing to prevent pain) or a Firefighter (numbing, distracting, reacting when pain leaks through)? Describe its strategy to your therapist.',
            'ACKNOWLEDGE ITS SERVICE: Tell the protector sincerely: "I see how hard you have been working to keep me safe. You have been doing this job for a very long time. Thank you." What is the protector\'s response? Does it seem surprised, skeptical, relieved?',
            'UNDERSTAND ITS ORIGIN: Ask the protector: "When did you first start doing this job? How old was I when you took on this role?" This often reveals the original overwhelming experience that created the protective strategy.',
            'MAP THE FEAR: Ask: "What are you most afraid would happen if you relaxed or stepped back?" Write down every fear the protector shares. These fears are usually about the exile it guards — the young wounded part carrying original pain.',
            'ADDRESS EACH CONCERN: With your therapist, go through each fear. For example: "I am afraid the sadness will overwhelm you" — respond: "I am an adult now with my therapist here. I have tools to handle big feelings. I will not fall apart."',
            'THE REQUEST: Gently ask: "Would you be willing to step back just a little — not all the way — so I can get to know the part you are protecting? You can step back in immediately if it feels too much. I promise to respect your boundaries."',
            'HONOR THE ANSWER: If the protector says yes, proceed slowly with your therapist. If it says no, respect that completely. Ask: "What would you need from me before you could allow access?" This builds trust for future sessions.',
            'POST-ACCESS CHECK: If you did access the exile, check back with the protector: "How was that for you? Was it okay? Do you need anything from me?" This is crucial for maintaining the protector\'s trust going forward.'
          ],
          interactiveElements: [
            'manager-identifier',
            'permission-seeker',
            'safety-planner'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-unburdening-ceremony',
          title: 'The Unburdening Ceremony',
          description: 'Guide your wounded exile through the sacred process of releasing burdens and receiving new qualities',
          type: 'guided_meditation',
          prompt: 'This is the most profound activity in IFS healing. The unburdening ceremony is where your exile finally releases the toxic beliefs and painful emotions it has carried since childhood. This should ideally be done with your therapist present. Only proceed if you have received genuine permission from your protectors and the exile is truly ready.',
          questions: [
            'FINAL READINESS CHECK: Confirm that all protectors have given permission. Confirm the exile feels safe and ready. Confirm you can feel Self-energy — calm, curious, compassionate. Confirm your therapist or support is present. Rate your overall readiness 1-10.',
            'WITNESSING: Allow the exile to show you its original painful experience. You do not need to relive it — simply witness it from Self, like watching a movie of the past. Tell the part: "I see what happened to you. I am so sorry. That should never have happened." What does the part show you?',
            'RETRIEVAL: Ask the part: "Would you like to leave that place? Would you like to come with me somewhere safe?" If yes, imagine gently taking the young part out of the scene. Bring it to a safe, nurturing place. Where does it choose to go?',
            'NAMING THE BURDENS: Ask the unburdened part: "What beliefs did you take on from that experience?" Write each one down. Common burdens: "I am not lovable," "I am broken," "It is my fault," "I am too much," "I am invisible," "I do not matter." What burdens does your part name?',
            'NAMING THE FEELINGS: Ask: "What feelings have you been carrying?" Shame, terror, grief, rage, despair, loneliness, helplessness. Let the part name every feeling burden it carries. There may be many layers.',
            'CHOOSING THE ELEMENT: Ask the part: "How would you like to release these burdens?" Offer the five elements: Fire (burn them away), Water (wash them away), Wind (let the breeze carry them away), Earth (release them into the ground), Light (dissolve them in radiant light). Which element does your part choose?',
            'THE RELEASE: Guide the part through releasing each burden using its chosen element. Go slowly. Notice what happens in the part and in your body as each burden lifts. Describe the experience. What changes? What lightens?',
            'INVITING NEW QUALITIES: Ask the now-lighter part: "What would you like to receive in place of those burdens?" Common qualities: worthiness, safety, love, joy, innocence, strength, freedom, belonging, peace. Let the part choose and absorb these qualities. What does it take in?',
            'WITNESSING THE TRANSFORMATION: Notice how the part has changed. Does it look different? Feel different? What is its natural state now that the burdens are gone? What gifts does this part bring to your system? Describe the transformation.',
            'SYSTEM-WIDE CHECK: Notice how your protectors respond. Often they spontaneously relax when the exile releases its burdens. Ask them: "How are you now that this part is lighter?" What shifts do you notice throughout your internal system?'
          ],
          interactiveElements: [
            'guided-meditation',
            'emotion-spectrum',
            'readiness-assessment'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-trailhead-exploration',
          title: 'Trailhead Exploration: From Triggers to Healing',
          description: 'Use real-life emotional triggers as doorways to discover and heal the parts underneath your reactions',
          type: 'reflection',
          prompt: 'In IFS, a "trailhead" is any real-life trigger — a moment when you have a strong emotional reaction that seems bigger than the situation warrants. These triggers are doorways to parts that need attention. This exercise helps you and your therapist trace a recent trigger back to the protector and exile that created the reaction, opening a path for healing.',
          questions: [
            'THE TRIGGER: Describe a recent situation where you had a strong emotional reaction — something that felt bigger or more intense than the situation warranted. What happened? Who was involved? What was said or done?',
            'THE REACTION: What exactly did you feel in that moment? What thoughts ran through your mind? What did your body do (tighten, freeze, flush, shake)? What did you want to do (yell, run, hide, fix, please)?',
            'FINDING THE PROTECTOR: The reaction you just described IS a protector part. Turn inward and locate it. Where is it in your body? What does it look like? What is its strategy? Is it a Manager (preventing pain) or Firefighter (reacting to pain)?',
            'ASKING THE PROTECTOR: From Self-energy, ask this protector: "What were you trying to do for me in that moment? What were you protecting me from?" Listen to its answer without judgment.',
            'FOLLOWING THE CHAIN: Ask the protector: "Who are you protecting? What younger part of me would be hurt if you did not step in?" Follow the thread inward. Notice who appears — this is usually an exile carrying an old wound.',
            'THE ORIGINAL WOUND: If the exile is willing to share, ask: "When did you first feel this way? Can you show me the original experience?" Let it reveal the connection between today\'s trigger and the original wound. What pattern do you see?',
            'OFFERING WHAT WAS NEEDED: Ask the younger part: "What did you need back then that you did not receive?" Then offer it from Self right now: safety, protection, validation, comfort, love. Notice what the part receives and how it responds.',
            'UPDATING THE PROTECTOR: Go back to the protector. Share what you learned about the exile it guards. Ask: "Now that I have connected with the part you protect, would you be willing to try a different approach next time this trigger comes up?" Discuss alternatives together.',
            'INTEGRATION INSIGHT: Write down the connection you discovered: "When [trigger] happens, my [protector] activates because it is trying to protect my [exile] who carries [wound] from [original experience]." How does understanding this chain change your relationship with this reaction?'
          ],
          interactiveElements: [
            'emotion-spectrum',
            'body-scan-mapper',
            'wound-selector'
          ]
        }
      },
      {
        type: 'activity',
        data: {
          id: 'activity-integration-daily-practice',
          title: 'Integration Daily Practice Planner',
          description: 'Create a personalized daily practice plan to maintain and deepen your healing between therapy sessions',
          type: 'reflection',
          prompt: 'Integration is what turns moments of healing into lasting transformation. This activity helps you build a realistic daily practice that keeps you connected to your internal family, strengthens Self-leadership, and ensures that healing work done in therapy sessions continues to grow in your everyday life.',
          questions: [
            'MORNING CHECK-IN PLAN: Design a 5-minute morning check-in with your parts. What will you do? Examples: sit quietly and ask "How is everyone today?", scan your body for parts signals, set a Self-energy intention for the day. What morning practice feels sustainable for you?',
            'PARTS AWARENESS PRACTICE: Throughout the day, you can notice parts activation. What are your personal signals that a part has been triggered? (racing heart, tight jaw, negative self-talk, urge to eat/drink/scroll). Write down your top 3 activation signals.',
            'MIDDAY RESET: Design a 2-minute midday reset. This could be: three deep breaths while checking in with your parts, a brief Self-energy meditation, or simply placing a hand on your heart and saying "I am here for all of you." What reset feels right?',
            'EVENING REFLECTION: How will you close each day with your internal family? Ideas: journal about which parts were active today, write a gratitude note to a protector that worked hard, review moments when you stayed in Self. What evening practice works for your schedule?',
            'WEEKLY DEEPER PRACTICE: Choose one longer weekly practice (15-30 min): a formal meditation with parts, journaling dialogue with a specific part, reviewing your therapy session notes, or doing a parts mapping update. When will you do this?',
            'SELF-CARE FOR PARTS: Different parts need different care. Your inner child might need play and creativity. Your perfectionist might need permission to rest. Your caretaker might need someone to care for IT. What self-care practices honor your specific parts?',
            'TRIGGER RESPONSE PLAN: When you get triggered, what is your step-by-step response? Example: 1) Notice the activation, 2) Take 3 breaths, 3) Say "A part of me is activated," 4) Get curious about which part, 5) Offer it compassion. Write your personalized plan.',
            'SUPPORT AND ACCOUNTABILITY: How will you stay consistent? Will you use a journal, an app reminder, share with a trusted friend, or bring your practice to therapy sessions? What support structure will help you maintain your practice?',
            'CELEBRATION PRACTICE: How will you celebrate your progress? Healing deserves acknowledgment. Ideas: milestone journaling, treating yourself with kindness, sharing a win with your therapist, creating a visual reminder of how far you have come.',
            'COMMITMENT: Write a brief commitment statement to yourself and your parts: "I commit to [specific practices] because my healing matters. I will be patient with myself and celebrate my progress." What is your commitment?'
          ],
          interactiveElements: [
            'readiness-assessment'
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
            'commitment-tracker',
            'emotion-wheel',
            'scenario-cards'
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
            'Welcome to this Safe Place Visualization for your Inner Child. Before we begin, take a moment to settle into a comfortable position. You may sit in a supportive chair or lie down \u2013 whatever allows your body to feel most held and secure. Adjust any pillows, blankets, or clothing so that nothing is pulling or pressing uncomfortably. This is your time, and you deserve to be comfortable. Know that throughout this meditation, you are completely safe. If at any point anything feels too overwhelming, you have full permission to open your eyes, feel your feet on the ground, look around the room, and return to the present moment. You are always in charge of this experience. [Pause for 10 seconds]',
            'Let us begin by grounding into your body and breath. Take a slow, deep breath in through your nose \u2013 feel the cool air entering your nostrils, flowing down into your lungs, expanding your belly like a soft balloon. Hold this breath gently for a count of three... and now release it slowly through your mouth with a long, quiet sigh. Feel your body soften with this exhale \u2013 your shoulders dropping, your jaw releasing, the muscles around your eyes relaxing. Take another deep breath in, even slower this time, filling every corner of your lungs... hold... and release, feeling yourself sink a little deeper into the surface beneath you. One more time \u2013 breathe in peace and safety... hold... and breathe out anything that does not serve you right now. [Pause for 10 seconds]',
            'Allow your breath to settle into a natural, easy rhythm. Now begin a gentle relaxation scan through your body. Starting at the top of your head, imagine a warm, honey-golden light slowly pouring down over you. It flows across your scalp, melting away any tightness. It moves over your forehead, smoothing away worry lines. It softens your eyes, your cheeks, your jaw. It flows down your neck, releasing tension you may have been carrying for hours or even years. This warm light pools in your shoulders and melts down your arms, loosening every muscle, all the way to your fingertips. It continues down through your chest and belly, warming and soothing your organs, calming your nervous system. It flows through your hips, down your thighs, over your knees, through your calves, and into your feet. Your entire body is now bathed in this warm, golden relaxation. [Pause for 15 seconds]',
            'From this deeply relaxed state, I invite you to use your imagination to step into an inner landscape. Picture yourself standing at the entrance to a path \u2013 perhaps a soft forest trail carpeted with fallen leaves, a sandy path leading to a quiet beach, a stone walkway winding through a sun-dappled garden, or a warm corridor leading to a cozy, firelit room. There is no right or wrong image \u2013 trust whatever appears. This is a place that exists only for you, created by the deepest wisdom of your Self. Notice the entrance to this path. What does the ground feel like beneath your feet? What is the quality of light here? Is it morning golden light, gentle twilight, or soft moonlight? Take your first step onto this path and notice how the air feels on your skin \u2013 its temperature, its freshness. [Pause for 15 seconds]',
            'Begin to walk slowly along this path, taking in your surroundings with all of your senses. Look around you \u2013 what do you see? Perhaps tall, ancient trees with sunlight filtering through their canopy, casting dancing patterns of light and shadow on the ground. Perhaps wildflowers in every imaginable color lining the path \u2013 deep purples, soft pinks, bright yellows, and pure whites. Perhaps a calm body of water nearby \u2013 a still lake, a gently flowing stream, or the vast, peaceful ocean. Listen to the sounds of this place. Perhaps birds are singing softly in the distance, leaves are rustling in a gentle breeze, water is bubbling over smooth stones, or there is simply a profound, healing silence. Breathe in the air of this place \u2013 perhaps it carries the scent of pine needles, wildflowers, ocean salt, warm wood, or fresh rain on earth. Everything here is designed to make you feel completely safe. [Pause for 20 seconds]',
            'As you continue along the path, you arrive at the heart of your safe place. This is a special area that feels like the most protected, nurturing spot in this entire landscape. Perhaps it is a sunlit clearing in the forest with soft moss and a gentle stream nearby, a cozy alcove on the beach sheltered by smooth rocks with the sound of gentle waves, a beautiful garden with a comfortable bench beneath a flowering tree, or a warm room with soft blankets, cushions, and a crackling fireplace. Look around this heart-space carefully. Notice every detail. What colors surround you? What is the quality of light? Is there something soft to sit or lie on? Are there any objects here that bring you comfort \u2013 perhaps a favorite childhood blanket, a beloved toy, a special book, or a warm cup of something soothing? This space has been designed by your deepest Self specifically for safety and healing. Nothing harmful can enter here. You are completely protected. [Pause for 20 seconds]',
            'Settle into this safe heart-space. Sit down or make yourself comfortable. Feel how this place holds you \u2013 the support beneath you, the gentle air around you, the beauty that surrounds you. As you settle in, notice how your body responds to being in complete safety. Perhaps your breathing deepens naturally. Perhaps muscles you didn\'t know were tense begin to release. Perhaps there is a warmth spreading through your chest. This is your nervous system recognizing that right here, right now, there is nothing to guard against, nothing to fix, nothing to manage. You can simply be. Allow yourself to rest here for a moment in pure, undisturbed peace. [Pause for 20 seconds]',
            'Now, from this place of deep safety, gently set an intention to meet your Inner Child. You don\'t need to force anything \u2013 simply hold the intention with warmth and openness, the way you might leave your front door open for a beloved friend. You might notice a subtle shift in the atmosphere of your safe place \u2013 perhaps the light brightens slightly, or the air becomes warmer, or you feel a gentle flutter of anticipation in your chest. Trust whatever you notice. Your Inner Child may approach you from the path, or appear sitting nearby, or simply materialize in front of you. They may come readily or they may hang back at a distance, watching cautiously. Either response is completely natural and perfectly okay. [Pause for 15 seconds]',
            'As your Inner Child becomes visible to you, take a moment to really see them without rushing forward. Notice how old they are \u2013 they might be a toddler, a young child, or a pre-teen. What are they wearing? Notice their hair, their face, their eyes. What expression do they carry? Perhaps they look frightened, or sad, or angry, or withdrawn, or even hopeful. Notice their posture \u2013 are they standing tall, hunching protectively, hiding behind something, or reaching toward you? Whatever you see, meet it with the gentle, open curiosity of Self. There is no wrong way for your Inner Child to appear. They are showing you exactly what you need to see right now. Silently, from your heart, send them a wave of warmth and welcome: "I see you. You belong here. You are welcome exactly as you are." [Pause for 20 seconds]',
            'Now, very gently, move toward your Inner Child \u2013 but only as close as they seem comfortable with. If they are wary, stop at a respectful distance and simply sit down on the ground so you are lower, less threatening, more approachable. If they seem open, you might kneel or crouch so that you are at their eye level. Let them set the pace. When you are close enough, look into their eyes with all the love and compassion you have within you. Speak to them softly, either aloud or in your mind: "Hello, little one. I\'m so glad to see you. I\'ve been wanting to meet you for a long time. I know things have been really hard for you, and I\'m sorry it\'s taken me so long to come. I\'m here now." Notice how they respond. Do they soften? Do they cry? Do they look skeptical? Whatever their response, remain steady and present. [Pause for 20 seconds]',
            'Ask your Inner Child gently: "What do you need right now? What would help you feel safe?" And then simply listen. Listen with your whole body, your whole heart. Their answer might come as words, or as an image, or as a feeling in your body, or as a knowing that arises from somewhere deep within you. Perhaps they need a hug \u2013 and if so, open your arms and let them come to you when they are ready, holding them with the tender firmness of someone who will never let go. Perhaps they need to hear specific words: "It wasn\'t your fault," or "You are lovable exactly as you are," or "I believe you," or "You didn\'t deserve what happened." Perhaps they simply need your quiet, steady presence \u2013 someone who stays, someone who doesn\'t look away, someone who isn\'t overwhelmed by their pain. Offer whatever arises naturally. Trust your Self to know exactly what is needed. [Allow 30 seconds of silence]',
            'If your Inner Child allows you to be close, hold them gently. Feel their small body against yours \u2013 the warmth of them, the aliveness of them. You might rock them gently, or stroke their hair, or simply wrap your arms around them and let them feel your heartbeat. As you hold them, speak the words they have been longing to hear, perhaps for decades: "I love you. You are safe now. I am the adult you grew up to become, and I am strong enough to take care of you. You don\'t have to carry this alone anymore. You don\'t have to be brave anymore. You can just be a child. I will handle the hard things. I am here, and I am not going anywhere." Feel the truth of these words resonating through your entire body. Notice if your Inner Child begins to relax, to soften, to let go of some weight they have been carrying. [Pause for 20 seconds]',
            'Now, look around your safe place together. Show your Inner Child all the beautiful details of this sanctuary you have created. Point out the things they might love \u2013 the soft places to rest, the beauty of nature around them, the warmth and comfort here. Let them know: "This place is for both of us. You can come here anytime you feel scared, or sad, or overwhelmed. I will always meet you here. This is our place \u2013 no one can take it away, no one can enter without our permission, and it will always be here." If it feels right, invite your Inner Child to add something to the space \u2013 perhaps a favorite toy, a pet, a tree house, a swing, or anything that brings them joy. Watch as they begin to explore and make this space their own. [Pause for 15 seconds]',
            'Before we begin to close this visualization, I invite you to give your Inner Child a gift \u2013 a symbol of your love and commitment to them. This might be a small glowing light they can hold in their hands, a special stone or crystal, a soft stuffed animal, a locket with your picture inside, a tiny star they can keep in their pocket, or anything else that arises in your imagination. As you place this gift in their hands, tell them what it represents: "Whenever you hold this, remember that I love you and I am always with you. Even when life gets busy and I forget to visit, this gift connects us heart to heart. You are never alone." Notice the look on their face as they receive this gift. [Pause for 15 seconds]',
            'It is now time to begin saying goodbye for today, but this is not a permanent goodbye \u2013 it is a promise of return. Look into your Inner Child\'s eyes one more time and say: "I have to go back to my day now, but I promise you \u2013 I will come back. I will visit you here in our safe place. I will check in with you throughout my day. I will listen when you try to get my attention through feelings in my body or big emotions. You matter to me more than you know, and learning to take care of you is the most important thing I can do." Give them one final embrace, or a gentle touch, or a wave \u2013 whatever feels right. Then turn and begin to walk slowly back along the path, feeling the connection between you and your Inner Child stretching like a golden thread that can never be broken, no matter how far you walk. [Pause for 15 seconds]',
            'As you walk back along the path, notice how you feel. Perhaps there is a tenderness in your chest, a warmth in your belly, moisture in your eyes, or a quiet sense of peace that wasn\'t there before. All of these responses are natural and beautiful signs that something real has happened in your inner world. Your Inner Child has been seen, perhaps for the first time in a very long time. That matters. That heals. Allow yourself to feel whatever is arising without judgment. [Pause for 10 seconds]',
            'Now gently begin to return your awareness to your physical body and the room around you. Feel the surface beneath you \u2013 its texture, its temperature, its solidity. Notice the sounds in the room and beyond it. Feel the air on your skin. Wiggle your fingers slowly, then your toes. Take a deep, grounding breath in through your nose... and release it slowly through your mouth. Take another breath, feeling yourself becoming more present and alert with each inhale. Roll your wrists, your ankles. If you are lying down, gently roll to one side before sitting up. [Pause for 10 seconds]',
            'When you are ready, gently open your eyes. Take a moment to look around the room and orient yourself to your present surroundings. You may want to place a hand over your heart and feel the warmth there \u2013 the connection to your Inner Child that remains alive and present even with your eyes open. Remember: your safe place exists within you always. Your Inner Child is waiting there, and they now know that you know how to find them. Set an intention to revisit this safe place at least once in the coming week, and to notice throughout your day when your Inner Child might be reaching out to you through emotions, body sensations, or reactions that feel younger than your actual age. Each time you notice, simply pause, place your hand on your heart, and whisper internally: "I see you, little one. I\'m here." This is the beginning of the most important relationship of your life \u2013 the one between you and your own precious Inner Child. [Pause for 10 seconds]'
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
            'Welcome to this Body-Based Inner Child Connection practice. This somatic meditation will guide you through a deep journey into your body \u2013 the living archive where your Inner Child\'s experiences, emotions, and memories are stored. Our bodies remember everything, even what our conscious minds have forgotten. Today, we will listen to what your body has been trying to tell you. Begin by finding a comfortable position \u2013 lying on your back is ideal for this practice, but sitting in a supportive chair works well too. Remove your shoes if possible and loosen any restrictive clothing. Allow your body to feel as unconfined and supported as possible. Before we go deeper, please know: if at any point a sensation becomes too intense or overwhelming, you can open your eyes, press your feet firmly into the floor, look around the room, and name five things you can see. You are always safe, and you are always in control. [Pause for 10 seconds]',
            'Let us begin by establishing a rhythm of breath that will serve as your anchor throughout this practice. Place one hand on your belly and one hand on your chest. Take a slow breath in through your nose, directing the air into your belly so that your lower hand rises first, then your chest expands. Hold this breath gently for a moment... and now release slowly through your mouth, feeling your chest lower first, then your belly deflating like a soft pillow. Again \u2013 breathe in through the nose, belly rises, chest expands... hold... and release through the mouth, chest lowers, belly softens. Establish this rhythm: belly rises, chest expands, hold, chest lowers, belly softens. This deep, diaphragmatic breathing sends a signal directly to your nervous system that says: "You are safe. It is okay to feel. It is okay to soften." Continue this breathing pattern for the next few breaths, allowing each exhale to take you a little deeper into relaxation. [Pause for 15 seconds]',
            'Now, keeping this gentle breathing rhythm, begin to turn your full attention to the physical sensations in your body. We are going to move through a slow, thorough body scan. The purpose is not to fix or change anything \u2013 it is simply to notice, to listen, to make contact. Begin at the very top of your head. Notice the crown of your skull \u2013 is there any sensation here? Tingling, pressure, warmth, coolness, numbness? Simply notice. Now move your awareness to your forehead. Many of us carry worry, overthinking, and vigilance here \u2013 the constant scanning for danger that your protective parts learned in childhood. Notice what your forehead holds. Is there tension between your eyebrows? A furrowed line of concentration? Breathe gently into this area and whisper internally: "I notice you. Thank you for being on alert. You can rest now." [Pause for 10 seconds]',
            'Move your awareness down to your eyes and the area around them. These are the windows through which your Inner Child first witnessed the world \u2013 both its beauty and its pain. Notice if there is tension around your eyes, as if they are bracing against something they don\'t want to see. Perhaps there is heaviness, as if tears are stored just behind them. Now bring your attention to your jaw. The jaw is one of the body\'s primary holding places for unexpressed emotion \u2013 words that were swallowed, screams that were silenced, anger that was deemed unsafe to express. Notice if your teeth are clenched, if your jaw muscles are tight, if there is an ache on either side. Gently let your mouth fall slightly open, creating a tiny space between your upper and lower teeth. Feel the relief of this small release. Breathe into your jaw and acknowledge: "I hear you. Whatever you are holding, I am here to listen." [Pause for 15 seconds]',
            'Now let your awareness flow down into your throat. The throat holds our voice \u2013 and for many Inner Child parts, the voice was the first thing that was silenced. "Don\'t cry." "Be quiet." "No one wants to hear that." Notice what your throat holds right now. Is there tightness, a lump, a constriction, as if something is trying to be said or expressed but can\'t get through? Place your fingers gently on your throat if that feels comfortable. Breathe warmth into this area and say internally: "Your voice matters. What you have to say is important. I am listening now, and you can speak to me in whatever way feels safe \u2013 through sensation, through emotion, through images, through memory. I am here." [Pause for 15 seconds]',
            'Bring your attention now to your shoulders, neck, and upper back. This is the region where many of us carry the weight of responsibility, the burden of having to grow up too fast, the tension of hypervigilance \u2013 always watching, always ready. Your shoulders may feel like they are holding up the world. Notice \u2013 are they hiked up toward your ears? Are they rounded forward in a protective posture, guarding your heart? Is there a deep ache between your shoulder blades \u2013 the place where wings would be if you could fly away from pain? Take a deep breath and on the exhale, consciously invite your shoulders to drop \u2013 even just a millimeter. And again. And once more. Each time they drop, they are releasing a tiny portion of a burden your Inner Child has been carrying. Whisper: "You don\'t have to carry this alone anymore. I am here to help shoulder this weight." [Pause for 15 seconds]',
            'Now move your awareness into the center of your chest \u2013 your heart space. This is perhaps the most important area in Inner Child healing, because the heart holds our deepest capacity for love and our deepest experiences of heartbreak. Place your hand gently over your heart if it\'s not already there. Feel its rhythm \u2013 that faithful, tireless beating that has kept you alive through everything. Notice what lives in your chest right now. Is there heaviness, as if a stone sits on your heart? Tightness, as if armor has been built around it? Aching, as if something in there is longing to be held? Warmth, as if your heart is reaching toward you? Whatever you find, meet it with the tender compassion of Self. This heart has been protecting your most vulnerable feelings since childhood. It has expanded and contracted thousands of times in response to love and loss. Breathe warmth into your chest and say: "Dear heart, I am here. I feel you. It is safe to open, even just a little, even just for now." [Pause for 20 seconds]',
            'Let your awareness descend now into your belly and solar plexus \u2013 the area between your ribs and your navel. This region is often called the body\'s emotional brain, and for good reason: your gut holds your deepest intuitions, your visceral responses to safety and danger, and many of your Inner Child\'s most primal emotions \u2013 fear, anxiety, excitement, dread, and the butterflies of both terror and joy. Notice what is present in your belly right now. Is there churning, as if your stomach is processing emotions it can\'t name? Hollowness, as if something is missing or empty? Tightness, as if bracing for impact? Nausea, as if something stored here is trying to rise and be released? Place both hands on your belly if that feels right. Feel the warmth of your palms sinking into this tender area. Breathe slowly and deeply into your hands, allowing your belly to rise and fall without restriction. Say: "I feel you. Whatever you are holding from my childhood, I am strong enough to be with it now. You don\'t have to process this alone." [Pause for 20 seconds]',
            'Now, having scanned through these major areas, I invite you to notice which part of your body is calling most strongly for your attention. It might be one of the areas we just visited, or it might be somewhere else entirely \u2013 your lower back, your hips, your hands, your feet, your pelvic floor. There is no wrong answer. Trust your body\'s wisdom. It knows exactly where your Inner Child\'s energy is most concentrated right now. Bring your full, loving attention to this area. If you can reach it, place your hand there. If not, simply direct your awareness to it like a warm spotlight. [Pause for 10 seconds]',
            'With your attention focused on this area, begin a deeper conversation with it. Take a slow breath and as you exhale, imagine sending your breath directly into this part of your body \u2013 warm, golden, compassionate breath flowing from your lungs into this specific spot. As you breathe into it, ask gently: "What are you holding? What emotion or memory lives here? How old is the part of me that stored this sensation?" And then simply wait. Don\'t force an answer. Be patient, the way you would sit quietly beside a frightened child, letting them speak in their own time. The response might come as an emotion \u2013 a wave of sadness, a flash of anger, a tremor of fear. It might come as an image \u2013 a memory, a face, a place. It might come as a physical sensation \u2013 a shift in temperature, a pulsing, a tingling, a softening. It might come as a knowing \u2013 a sudden clarity about what this body area has been protecting. Receive whatever comes without judgment. [Allow 30 seconds of silence]',
            'If a specific age, memory, or Inner Child part has made themselves known through this body area, turn toward them now with the full warmth and presence of your Self. Acknowledge what you are receiving: "I feel you here. I can sense how long you\'ve been holding this. You\'ve been so brave, carrying this in my body, trying to get my attention through aches and tension and discomfort. I am finally listening. Thank you for not giving up on me." Continue to breathe warmth into this area, and notice if the sensation begins to shift. Perhaps the tightness softens slightly. Perhaps the temperature changes. Perhaps emotion begins to move \u2013 tears, a trembling, a deep sigh. All movement is healing. Allow whatever wants to happen. [Pause for 20 seconds]',
            'Now I invite you to use your breath as a vehicle for release. On your next inhale, imagine you are breathing in pure, golden compassion \u2013 drawing it in from the universe itself, from the earth beneath you, from the air around you. Hold this golden breath for just a moment, letting it gather the pain, the tension, the stored emotion from this area of your body. And on the exhale, release it all \u2013 breathe out through your mouth as if you are blowing a dark, heavy cloud out of your body. Watch it dissipate into the air, transformed and released. Again: inhale golden compassion into this body area... hold, letting it gather what needs to be released... and exhale, sending the burden out of your body with your breath. Continue this cycle for several breaths, trusting that each round is releasing a layer of held pain. You may notice your body wanting to shake, tremble, sigh deeply, yawn, or produce tears. These are all signs of somatic release \u2013 your nervous system discharging energy that has been stored since childhood. Allow it all. [Pause for 20 seconds]',
            'As the release settles, notice how this area of your body feels now compared to when we first brought attention to it. Perhaps it feels lighter, warmer, softer, or more spacious. Perhaps the sensation has shifted location or quality. Perhaps there is a pleasant tingling or a sense of emptiness where heaviness once lived. Whatever you notice, offer this area of your body genuine gratitude: "Thank you for holding this for me for so long. Thank you for communicating with me today. I am learning to listen, and I promise to keep checking in with you." Place your hand on this area one more time, sending a final wave of warmth and love into it, sealing this new connection between your conscious awareness and your body\'s deep wisdom. [Pause for 15 seconds]',
            'Now I invite you to establish an ongoing body-based communication channel with your Inner Child. This is a practice you can use anytime, anywhere. Set an intention to check in with your body at least once daily \u2013 perhaps when you first wake up, during a quiet moment at midday, or before you fall asleep. The practice is simple: close your eyes, take three deep breaths, scan your body for any area that holds sensation, place your attention there, and ask: "What are you trying to tell me today?" Your Inner Child lives in your body, and your body is always speaking. Learning to listen is one of the most profound healing gifts you can offer yourself. Over time, you will develop a fluent, intuitive language between your conscious Self and the child within your body. [Pause for 10 seconds]',
            'We will now begin to gently close this practice. Take a moment to appreciate the courage it took to turn inward and listen to your body so deeply today. Not everyone can do this. Not everyone is willing. But you chose to be here, to listen, to feel, and that choice is itself a profound act of healing for your Inner Child. Take a deep, nourishing breath in... and release it with a sigh. Feel the surface beneath you, solid and supportive. Begin to gently move your body \u2013 wiggle your fingers and toes, roll your wrists and ankles in small circles, rock your head gently from side to side. If you are lying down, hug your knees gently to your chest and rock side to side, massaging your lower back \u2013 a gesture of self-comfort and physical care. [Pause for 10 seconds]',
            'Stretch your body in any way that feels good \u2013 reach your arms overhead, point and flex your feet, twist gently side to side. These movements help integrate the somatic release you\'ve experienced and signal to your nervous system that you are transitioning back to full waking awareness. If you feel emotional, that is completely natural. Allow the emotions to move through you like weather passing through a sky. They do not define you \u2013 they are simply energy in motion, finally free to flow after being held in your body for so long. [Pause for 10 seconds]',
            'When you feel ready, gently open your eyes. Take a moment to orient yourself to the room \u2013 notice the colors, the shapes, the light. Feel the ground beneath your feet. You are here, in the present moment, in an adult body that now has a deeper, more compassionate relationship with the child who lives within it. Before you move on with your day, take one more breath and place your hand on the body area that spoke to you most strongly today. Make a silent promise: "I will listen to you. I will come back. You are not alone in this body anymore \u2013 we are in this together." Carry this body-based awareness with you as you move through the rest of your day, noticing when your Inner Child speaks through sensation, and responding not with judgment or avoidance, but with the gentle curiosity and compassion of Self. Welcome to the beginning of a lifelong conversation between you and your own precious body. [Pause for 10 seconds]'
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