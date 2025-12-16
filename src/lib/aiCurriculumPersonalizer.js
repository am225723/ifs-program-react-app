// AI-Powered Curriculum Personalization Service
// Uses assessment results to dynamically tailor the curriculum to each child's wound profile

class AICurriculumPersonalizer {
  constructor() {
    this.woundProfiles = {
      abandonment: {
        name: "Abandonment (Lonely Child)",
        focus: ["building secure attachment", "self-soothing", "boundary setting", "trust building"],
        activities: ["grounding exercises", "attachment visualization", "safety protocols"],
        modules: ["inner-child-connection", "secure-attachment-building", "self-soothing-mastery"],
        healingGoals: [
          "Develop internal secure attachment",
          "Learn self-soothing techniques",
          "Build healthy boundaries",
          "Heal trust issues",
          "Reduce fear of abandonment"
        ]
      },
      shame: {
        name: "Shame (Unworthy Child)",
        focus: ["self-compassion", "inner critic work", "worthiness cultivation", "self-acceptance"],
        activities: ["compassion meditation", "inner critic dialogue", "worthiness affirmations"],
        modules: ["inner-child-connection", "self-compassion-mastery", "inner-critic-work"],
        healingGoals: [
          "Cultivate self-compassion",
          "Transform inner critic",
          "Build sense of worthiness",
          "Practice self-acceptance",
          "Release shame burdens"
        ]
      },
      neglect: {
        name: "Neglect (Lost Child)",
        focus: ["self-advocacy", "needs identification", "self-care practices", "visibility work"],
        activities: ["needs assessment", "self-care planning", "boundary learning", "expression exercises"],
        modules: ["inner-child-connection", "needs-identification", "self-advocacy-skills"],
        healingGoals: [
          "Identify and honor needs",
          "Develop self-advocacy skills",
          "Practice consistent self-care",
          "Find authentic expression",
          "Build sense of mattering"
        ]
      },
      betrayal: {
        name: "Betrayal (Terrified Child)",
        focus: ["safety regulation", "trust rebuilding", "vulnerability work", "fear management"],
        activities: ["safety protocols", "gradual trust exercises", "fear processing"],
        modules: ["inner-child-connection", "safety-regulation", "trust-rebuilding"],
        healingGoals: [
          "Establish internal safety",
          "Regulate fear responses",
          "Rebuild trust capacity",
          "Practice healthy vulnerability",
          "Heal trauma responses"
        ]
      }
    };
  }

  /**
   * Analyze assessment results and create personalized curriculum
   * @param {Array} assessmentResults - Assessment wound scores
   * @returns {Object} Personalized curriculum configuration
   */
  analyzeAndPersonalize(assessmentResults) {
    console.log('🧠 AI analyzing assessment results for personalization...');
    
    if (!assessmentResults || assessmentResults.length === 0) {
      console.log('❌ No assessment results provided');
      return this.getDefaultCurriculum();
    }

    // Sort by score to get primary, secondary, tertiary wounds
    const sortedResults = [...assessmentResults].sort((a, b) => b.score - a.score);
    const primaryWound = sortedResults[0];
    const secondaryWound = sortedResults[1];
    const tertiaryWound = sortedResults.slice(2);

    // Calculate wound intensity levels
    const intensity = this.calculateWoundIntensity(primaryWound.score);
    
    console.log(`📊 Primary wound: ${primaryWound.id} (${primaryWound.score}/24) - ${intensity} intensity`);
    console.log(`📊 Secondary wound: ${secondaryWound?.id} (${secondaryWound?.score}/24)`);
    console.log(`📊 Tertiary wounds: ${tertiaryWound.map(w => `${w.id}(${w.score})`).join(', ')}`);

    // Generate personalized curriculum
    const personalizedCurriculum = {
      primaryWound: primaryWound.id,
      secondaryWound: secondaryWound?.id || null,
      tertiaryWounds: tertiaryWound.map(w => w.id),
      intensity,
      personalizedModules: this.generatePersonalizedModules(primaryWound, secondaryWound, tertiaryWound),
      healingPlan: this.createHealingPlan(primaryWound, secondaryWound, intensity),
      adaptations: this.generateAdaptations(primaryWound, secondaryWound, intensity),
      timeline: this.calculatePersonalizedTimeline(primaryWound, intensity),
      successMetrics: this.defineSuccessMetrics(primaryWound, secondaryWound)
    };

    console.log('✅ AI personalization complete');
    return personalizedCurriculum;
  }

  /**
   * Calculate wound intensity level
   * @param {number} score - Wound assessment score (0-24)
   * @returns {string} Intensity level
   */
  calculateWoundIntensity(score) {
    if (score >= 20) return 'severe';
    if (score >= 15) return 'high';
    if (score >= 10) return 'moderate';
    if (score >= 5) return 'mild';
    return 'minimal';
  }

  /**
   * Generate personalized module sequence based on wound profile
   * @param {Object} primaryWound - Primary wound data
   * @param {Object} secondaryWound - Secondary wound data
   * @param {Array} tertiaryWounds - Tertiary wound data
   * @returns {Array} Personalized module sequence
   */
  generatePersonalizedModules(primaryWound, secondaryWound, tertiaryWounds) {
    const primaryProfile = this.woundProfiles[primaryWound.id];
    const secondaryProfile = secondaryWound ? this.woundProfiles[secondaryWound.id] : null;
    
    // Base modules for everyone
    const baseModules = [
      {
        id: 'foundation-welcome',
        title: 'Welcome to Your Healing Journey',
        description: 'Foundation introduction to the healing process',
        category: 'introduction',
        order: 1,
        isRequired: true,
        estimatedMinutes: 15,
        personalizedContent: {
          message: `Your healing journey will focus on healing your ${primaryProfile.name}`,
          expectations: this.setExpectations(primaryWound, primaryProfile)
        }
      }
    ];

    // Primary wound-specific modules
    const primaryModules = primaryProfile.modules.map((moduleId, index) => ({
      id: `${primaryWound.id}-${moduleId}`,
      title: this.generateModuleTitle(primaryWound.id, moduleId),
      description: this.generateModuleDescription(primaryWound.id, moduleId),
      category: 'inner_child_healing',
      order: index + 2,
      isRequired: true,
      estimatedMinutes: this.estimateModuleTime(primaryWound.id, moduleId),
      personalizedContent: {
        woundFocus: primaryProfile.name,
        healingGoals: primaryProfile.healingGoals,
        activities: primaryProfile.activities,
        adaptations: this.getActivityAdaptations(primaryWound.id)
      },
      innerChildFocus: true
    }));

    // Secondary wound integration modules
    const integrationModules = [];
    if (secondaryProfile) {
      integrationModules.push({
        id: 'integration-secondary-wound',
        title: `Integrating ${secondaryProfile.name} Healing`,
        description: `Addressing both ${primaryProfile.name} and ${secondaryProfile.name} patterns`,
        category: 'integration',
        order: primaryModules.length + 2,
        isRequired: true,
        estimatedMinutes: 25,
        personalizedContent: {
          message: `Integration work for ${primaryProfile.name} and ${secondaryProfile.name}`,
          combinedFocus: [primaryProfile.focus, secondaryProfile.focus].flat()
        }
      });
    }

    // Advanced modules based on intensity
    const advancedModules = [];
    const intensity = this.calculateWoundIntensity(primaryWound.score);
    
    if (intensity === 'severe' || intensity === 'high') {
      advancedModules.push({
        id: 'intensive-healing-protocols',
        title: 'Intensive Healing Protocols',
        description: 'Deep healing work for high-intensity wounds',
        category: 'protocols',
        order: primaryModules.length + integrationModules.length + 2,
        isRequired: true,
        estimatedMinutes: 30,
        personalizedContent: {
          intensityLevel: intensity,
          specializedTechniques: this.getIntensiveTechniques(primaryWound.id)
        }
      });
    }

    // Consolidation and future planning
    const consolidationModules = [
      {
        id: 'healing-consolidation',
        title: 'Consolidating Your Healing',
        description: 'Integrate your learning and plan for continued growth',
        category: 'integration',
        order: baseModules.length + primaryModules.length + integrationModules.length + advancedModules.length + 1,
        isRequired: true,
        estimatedMinutes: 20,
        personalizedContent: {
          achievedGoals: primaryProfile.healingGoals,
          ongoingPractice: this.getOngoingPractices(primaryWound.id)
        }
      }
    ];

    return [...baseModules, ...primaryModules, ...integrationModules, ...advancedModules, ...consolidationModules];
  }

  /**
   * Create comprehensive healing plan
   * @param {Object} primaryWound - Primary wound
   * @param {Object} secondaryWound - Secondary wound
   * @param {string} intensity - Intensity level
   * @returns {Object} Healing plan configuration
   */
  createHealingPlan(primaryWound, secondaryWound, intensity) {
    const primaryProfile = this.woundProfiles[primaryWound.id];
    
    return {
      phase1: {
        name: "Safety and Connection",
        duration: intensity === 'severe' ? '3-4 weeks' : '2-3 weeks',
        focus: ["establish safety", "connect with inner child", "build trust"],
        activities: ["safety protocols", "inner child introduction", "trust building"],
        goals: ["Feel safe in the process", "Meet your inner child", "Establish connection"]
      },
      phase2: {
        name: "Wound-Specific Healing",
        duration: intensity === 'severe' ? '6-8 weeks' : '4-6 weeks',
        focus: primaryProfile.focus,
        activities: primaryProfile.activities,
        goals: primaryProfile.healingGoals
      },
      phase3: {
        name: "Integration and Strengthening",
        duration: '3-4 weeks',
        focus: secondaryWound ? [`integrating ${primaryProfile.name}`, `addressing ${secondaryWound?.name}`] : ["integrating healing", "building strength"],
        activities: ["integration exercises", "strength building", "future planning"],
        goals: ["Integrate learning", "Build resilience", "Plan for continued growth"]
      }
    };
  }

  /**
   * Generate adaptations for the user's specific needs
   * @param {Object} primaryWound - Primary wound
   * @param {Object} secondaryWound - Secondary wound
   * @param {string} intensity - Intensity level
   * @returns {Object} Adaptations configuration
   */
  generateAdaptations(primaryWound, secondaryWound, intensity) {
    const adaptations = {
      pacing: this.calculatePacing(intensity),
      supportLevel: this.calculateSupportLevel(intensity),
      exerciseTypes: this.getRecommendedExerciseTypes(primaryWound.id),
      warnings: this.getSpecificWarnings(primaryWound.id),
      accommodations: this.getAccommodations(primaryWound.id, intensity)
    };

    if (secondaryWound) {
      adaptations.secondaryConsiderations = this.getSecondaryConsiderations(secondaryWound.id);
    }

    return adaptations;
  }

  /**
   * Calculate personalized timeline
   * @param {Object} primaryWound - Primary wound
   * @param {string} intensity - Intensity level
   * @returns {Object} Timeline configuration
   */
  calculatePersonalizedTimeline(primaryWound, intensity) {
    const baseWeeks = {
      severe: 12,
      high: 10,
      moderate: 8,
      mild: 6,
      minimal: 4
    };

    const totalWeeks = baseWeeks[intensity] || 8;
    
    return {
      totalWeeks,
      recommendedSessionFrequency: intensity === 'severe' ? '3x per week' : '2x per week',
      sessionDuration: intensity === 'severe' ? '45-60 minutes' : '30-45 minutes',
      integrationPeriod: Math.ceil(totalWeeks * 0.25), // 25% of time for integration
      milestones: this.generateMilestones(primaryWound, totalWeeks)
    };
  }

  /**
   * Define success metrics for tracking progress
   * @param {Object} primaryWound - Primary wound
   * @param {Object} secondaryWound - Secondary wound
   * @returns {Array} Success metrics
   */
  defineSuccessMetrics(primaryWound, secondaryWound) {
    const primaryProfile = this.woundProfiles[primaryWound.id];
    const baseMetrics = [
      {
        category: "Inner Child Connection",
        metrics: [
          "Ability to connect with inner child without fear",
          "Increased sense of compassion for inner child",
          "Improved communication with inner child"
        ]
      },
      {
        category: "Emotional Regulation",
        metrics: [
          "Reduced intensity of emotional triggers",
          "Improved ability to self-soothe",
          "Greater emotional stability"
        ]
      }
    ];

    const woundSpecificMetrics = [
      {
        category: `${primaryProfile.name} Healing`,
        metrics: primaryProfile.healingGoals.map(goal => `Demonstrated progress in: ${goal}`)
      }
    ];

    return [...baseMetrics, ...woundSpecificMetrics];
  }

  // Helper methods for generating personalized content
  generateModuleTitle(woundId, moduleId) {
    const titles = {
      abandonment: {
        'inner-child-connection': 'Connecting with Your Lonely Child',
        'secure-attachment-building': 'Building Internal Secure Attachment',
        'self-soothing-mastery': 'Mastering Self-Soothing Techniques'
      },
      shame: {
        'inner-child-connection': 'Meeting Your Unworthy Child',
        'self-compassion-mastery': 'Cultivating Deep Self-Compassion',
        'inner-critic-work': 'Transforming Your Inner Critic'
      },
      neglect: {
        'inner-child-connection': 'Finding Your Lost Child',
        'needs-identification': 'Learning to Identify Your Needs',
        'self-advocacy-skills': 'Developing Self-Advocacy'
      },
      betrayal: {
        'inner-child-connection': 'Connecting with Your Terrified Child',
        'safety-regulation': 'Establishing Internal Safety',
        'trust-rebuilding': 'Rebuilding Trust Capacity'
      }
    };
    return titles[woundId]?.[moduleId] || 'Personalized Healing Module';
  }

  generateModuleDescription(woundId, moduleId) {
    const descriptions = {
      abandonment: {
        'inner-child-connection': 'Meet the part of you that fears abandonment and learn to provide the security it needs.',
        'secure-attachment-building': 'Build a secure internal attachment system that makes you feel safe and connected.',
        'self-soothing-mastery': 'Develop powerful self-soothing techniques to calm abandonment fears.'
      },
      shame: {
        'inner-child-connection': 'Gently meet the part of you that carries shame and offer it unconditional love.',
        'self-compassion-mastery': 'Learn to treat yourself with the compassion and kindness you deserve.',
        'inner-critic-work': 'Transform your harsh inner critic into a supportive inner ally.'
      },
      neglect: {
        'inner-child-connection': 'Find and reconnect with the part of you that felt invisible and neglected.',
        'needs-identification': 'Learn to identify, honor, and meet your own emotional needs.',
        'self-advocacy-skills': 'Develop the confidence to advocate for yourself in healthy ways.'
      },
      betrayal: {
        'inner-child-connection': 'Create safety for the part of you that has been hurt by betrayal.',
        'safety-regulation': 'Learn techniques to regulate fear and create internal safety.',
        'trust-rebuilding': 'Gradually rebuild your capacity to trust yourself and others.'
      }
    };
    return descriptions[woundId]?.[moduleId] || 'Personalized healing module for your specific wound pattern.';
  }

  estimateModuleTime(woundId, moduleId) {
    const baseTimes = {
      'inner-child-connection': 30,
      'secure-attachment-building': 25,
      'self-soothing-mastery': 35,
      'self-compassion-mastery': 30,
      'inner-critic-work': 40,
      'needs-identification': 25,
      'self-advocacy-skills': 35,
      'safety-regulation': 30,
      'trust-rebuilding': 35
    };
    return baseTimes[moduleId] || 30;
  }

  setExpectations(primaryWound, profile) {
    return {
      primaryFocus: profile.name,
      healingApproach: `Gentle, compassionate work focused on ${profile.focus.join(', ')}`,
      timeline: "Your healing will unfold at its own pace - we honor your timing",
      support: "You'll learn to be your own loving parent and healer"
    };
  }

  getActivityAdaptations(woundId) {
    const adaptations = {
      abandonment: ["Gentle attachment exercises", "Safety building", "Gradual independence work"],
      shame: ["Compassion-focused practices", "Inner critic transformation", "Worthiness building"],
      neglect: ["Needs identification", "Self-care practices", "Visibility exercises"],
      betrayal: ["Safety protocols", "Trust building", "Fear regulation"]
    };
    return adaptations[woundId] || ["Standard healing exercises"];
  }

  calculatePacing(intensity) {
    return {
      severe: "Very gentle pacing with frequent breaks",
      high: "Gentle pacing with regular check-ins",
      moderate: "Moderate pacing with some integration time",
      mild: "Standard pacing with optional breaks",
      minimal: "Comfortable pace with flexibility"
    };
  }

  calculateSupportLevel(intensity) {
    return {
      severe: "High support recommended - consider therapist guidance",
      high: "Moderate to high support recommended",
      moderate: "Moderate support - regular check-ins advised",
      mild: "Light support - self-paced with check-ins",
      minimal: "Self-directed with minimal support needed"
    };
  }

  getRecommendedExerciseTypes(woundId) {
    const types = {
      abandonment: ["grounding", "attachment", "safety", "boundary"],
      shame: ["compassion", "inner critic", "worthiness", "self-acceptance"],
      neglect: ["needs identification", "self-care", "expression", "advocacy"],
      betrayal: ["safety", "trust", "fear regulation", "vulnerability"]
    };
    return types[woundId] || ["general healing"];
  }

  getSpecificWarnings(woundId) {
    const warnings = {
      abandonment: "May trigger fears of being alone - ensure support is available",
      shame: "May bring up difficult emotions - practice extra self-compassion",
      neglect: "May feel overwhelming at first - start small and build gradually",
      betrayal: "May activate fear responses - maintain safety protocols"
    };
    return warnings[woundId] || "Proceed with self-awareness and compassion";
  }

  getAccommodations(woundId, intensity) {
    const baseAccommodations = {
      severe: "Extra time for each module, frequent breaks, optional therapist support",
      high: "Additional time, regular check-ins, integration exercises",
      moderate: "Standard pacing with optional additional time",
      mild: "Standard pace with flexibility to slow down if needed",
      minimal: "Self-paced with minimal modifications"
    };
    return baseAccommodations[intensity];
  }

  getIntensiveTechniques(woundId) {
    const techniques = {
      abandonment: ["Advanced attachment work", "Deep safety protocols", "Complex trauma integration"],
      shame: ["Deep shame release", "Inner critic transformation", "Core worthiness work"],
      neglect: ["Advanced needs work", "Deep self-advocacy", "Expression therapy"],
      betrayal: ["Advanced trauma release", "Deep trust building", "Complex fear regulation"]
    };
    return techniques[woundId] || ["Advanced healing techniques"];
  }

  getOngoingPractices(woundId) {
    const practices = {
      abandonment: "Daily attachment check-ins, weekly self-soothing practice",
      shame: "Daily compassion practice, weekly inner critic dialogue",
      neglect: "Daily needs check, weekly self-care routine",
      betrayal: "Daily safety check, weekly trust practice"
    };
    return practices[woundId] || "Daily healing practice";
  }

  generateMilestones(primaryWound, totalWeeks) {
    return [
      { week: Math.ceil(totalWeeks * 0.25), milestone: "Established safety and connection" },
      { week: Math.ceil(totalWeeks * 0.5), milestone: "Significant wound healing progress" },
      { week: Math.ceil(totalWeeks * 0.75), milestone: "Integration and strengthening" },
      { week: totalWeeks, milestone: "Healing consolidation and future planning" }
    ];
  }

  getSecondaryConsiderations(secondaryWoundId) {
    return {
      woundType: this.woundProfiles[secondaryWoundId].name,
      additionalFocus: this.woundProfiles[secondaryWoundId].focus,
      integrationNeeds: [`Address ${secondaryWoundId} patterns`, `Integrate with primary wound healing`]
    };
  }

  getDefaultCurriculum() {
    return {
      primaryWound: null,
      personalizedModules: [],
      healingPlan: {},
      adaptations: {},
      timeline: { totalWeeks: 8 },
      successMetrics: []
    };
  }
}

export const aiCurriculumPersonalizer = new AICurriculumPersonalizer();
export default aiCurriculumPersonalizer;