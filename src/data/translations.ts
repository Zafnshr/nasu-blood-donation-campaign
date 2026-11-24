import type { Locale } from "@/types";

export const UI_COPY: Record<
  Locale,
  {
    nav: {
      home: string;
      play: string;
      learn: string;
      donate: string;
      card: string;
      share: string;
      switchToOtherLang: string;
      switchLangAria: string;
      toDarkAria: string;
      toLightAria: string;
    };
    toast: {
      stampUnlocked: string;
    };
    home: {
      eyebrow: string;
      heroLine1: string;
      heroHighlight: string;
      heroSub: string;
      ctaChallenge: string;
      ctaCard: string;
      tapDrop: string;
      pulseSynced: (count: number) => string;
      marqueeItems: string[];
      journeyHeading: string;
      journeyDuration: string;
      cardCreatedBadge: string;
      cardCollectBadge: string;
      stampsHeading: (count: number) => string;
      stampsSub: string;
      viewMyCard: string;
      closingCta: string;
    };
    play: {
      title: string;
      introSub: string;
      bestScore: (n: number) => string;
      letsGo: string;
      scoreLabel: (n: number) => string;
      streakLabel: (n: number) => string;
      statementNum: (n: number) => string;
      swipeHint: string;
      mythBtn: string;
      factBtn: string;
      correct: string;
      notQuite: string;
      itsFact: string;
      itsMyth: string;
      next: string;
      seeScore: string;
      outOfTen: string;
      unlockedNote: string;
      playAgain: string;
      makeCard: string;
      learnMore: string;
      headlines: {
        perfect: string;
        sharp: string;
        gettingThere: string;
        nowYouKnow: string;
      };
    };
    learn: {
      tabs: {
        blood101: string;
        recovery: string;
        components: string;
        bloodTypes: string;
        match: string;
      };
      sections: {
        blood101: { eyebrow: string; title: string; subtitle: string };
        recovery: { eyebrow: string; title: string; subtitle: string };
        components: { eyebrow: string; title: string; subtitle: string };
        bloodTypes: { eyebrow: string; title: string; subtitle: string };
        match: { eyebrow: string; title: string; subtitle: string };
      };
      tube: {
        title: string;
        spunSub: string;
        idleSub: string;
        spinBtn: string;
        spinningBtn: string;
        spinAgainBtn: string;
        wholeBlood: string;
        idleHint: string;
        unlocked: string;
      };
      marrow: {
        title: string;
        sub: string;
      };
      slider: {
        title: string;
        sub: string;
        dayLabel: (d: number) => string;
        sliderAria: string;
        restored: string;
      };
      components: {
        shelfLife: string;
        usedFor: string;
      };
      journey: {
        title: string;
        sub: string;
      };
      explorer: {
        chooseAria: string;
        giveTo: string;
        receiveFrom: string;
        plasmaPrefix: string;
        globalPrefix: string;
        funFactPrefix: string;
        markerA: string;
        markerB: string;
        markerRhPos: string;
        markerRhNeg: string;
        markerZero: string;
      };
      matchGame: {
        title: string;
        introSub: string;
        startBtn: string;
        roundLabel: (cur: number, total: number) => string;
        scoreLabel: (s: number) => string;
        patientNeeds: string;
        chooseDonor: string;
        safeMatch: string;
        unsafeMatch: string;
        next: string;
        finish: string;
        completeEyebrow: string;
        completeScore: (s: number) => string;
        unlockedNote: string;
        playAgain: string;
        makeCard: string;
      };
    };
    donate: {
      tabs: {
        why: string;
        eligibility: string;
        day: string;
        aftercare: string;
      };
      sections: {
        why: { eyebrow: string; title: string; subtitle: string };
        eligibility: { eyebrow: string; title: string; subtitle: string };
        day: { eyebrow: string; title: string; subtitle: string };
        aftercare: { eyebrow: string; title: string; subtitle: string };
      };
      split: {
        tapBtn: string;
        helpsLabel: string;
        oneToThree: string;
        replay: string;
        whoNeedsTitle: string;
      };
      eligibility: {
        questionOf: (cur: number, total: number) => string;
        quickTag: string;
        yes: string;
        no: string;
        na: string;
        unlockedNote: string;
        askBoothLabel: string;
        startOver: string;
        makeCard: string;
      };
      steps: {
        totalPrefix: string;
      };
      checklists: {
        beforeTitle: string;
        afterTitle: string;
        proAftercare: string;
      };
    };
    card: {
      createTitle: string;
      editTitle: string;
      formSub: string;
      firstName: string;
      namePlaceholder: string;
      nameError: string;
      bloodTypeLabel: string;
      unknownBtn: string;
      finishLabel: string;
      finishes: {
        crimson: string;
        midnight: string;
        pearl: string;
      };
      donatedTodayLabel: string;
      submitCreate: string;
      submitSave: string;
      cancel: string;
      viewTitle: string;
      viewSub: string;
      donatedHeroBadge: string;
      idLabel: string;
      todayDate: string;
      canGiveTo: string;
      canReceiveFrom: string;
      stampsHeading: string;
      download: string;
      share: string;
      flip: string;
      edit: string;
      downloadedToast: string;
      downloadErr: string;
      sharedToast: string;
      shareFallbackToast: string;
      shareErr: string;
      collectTitle: string;
      collectSub: string;
      shareCardTitle: string;
      shareCardText: string;
      downloadModalTitle: string;
      downloadFront: string;
      downloadBack: string;
      downloadCombined: string;
      downloadSeparate: string;
      iosSaveTitle: string;
      iosSaveHint: string;
      iosSaveClose: string;
    };
    share: {
      eyebrow: string;
      title: string;
      subtitle: string;
      scanHint: string;
      fullscreenBtn: string;
      fullscreenHint: string;
      closeModal: string;
      shareNative: string;
      whatsapp: string;
      copyLink: string;
      copied: string;
      saveQr: string;
      savingQr: string;
      savedToast: string;
      sharedToast: string;
      shareErr: string;
      shareTitle: string;
      shareMessage: string;
      footerShareLink: string;
      steps: { title: string; body: string }[];
    };
  }
> = {
  ar: {
    nav: {
      home: "الرئيسية",
      play: "العب",
      learn: "تعلّم",
      donate: "تبرّع",
      card: "البطاقة",
      share: "شارك",
      switchToOtherLang: "EN",
      switchLangAria: "Switch language to English",
      toDarkAria: "تفعيل الوضع الداكن",
      toLightAria: "تفعيل الوضع الفاتح",
    },
    toast: {
      stampUnlocked: "تم فتح ختم جديد",
    },
    home: {
      eyebrow: "حملة NASU للتبرع بالدم",
      heroLine1: "تبرّع واحد.",
      heroHighlight: "حتى ثلاث أرواح.",
      heroSub:
        "اكشف الخرافات الشائعة، تعرّف على أسرار دمك، واحصل على بطاقة متبرع تفاعلية خاصة بك في ٥ دقائق.",
      ctaChallenge: "ابدأ تحدي الدقيقتين",
      ctaCard: "اصنع بطاقتي الآن",
      tapDrop: "اضغط على القطرة",
      pulseSynced: (n) => `نبض متزامن ×${n}`,
      marqueeItems: [
        "تبرّع واحد = إنقاذ حتى ٣ أرواح",
        "البلازما تتجدد خلال ٢٤–٤٨ ساعة",
        "التبرع الفعلي يستغرق ~١٠ دقائق فقط",
        "أدوات معقمة ١٠٠٪ تُستخدم مرة واحدة",
        "فحص فصيلة دم مجاني بعد التبرع",
        "نخاع العظم يصنع مليوني خلية حمراء كل ثانية",
      ],
      journeyHeading: "رحلتك في الحملة",
      journeyDuration: "~٥ دقائق إجمالاً",
      cardCreatedBadge: "تم الإنشاء",
      cardCollectBadge: "هديتك التذكارية",
      stampsHeading: (c) => `جمعت ${c} من ٤ أختام`,
      stampsSub:
        "استكشف كل قسم لفتح الأختام الأربعة على ظهر بطاقة المتبرع الخاصة بك.",
      viewMyCard: "عرض بطاقتي",
      closingCta: "جاهز للتبرع؟ ابحث عن فريق حملة NASU في نقطة التبرع.",
    },
    play: {
      title: "حقيقة أم خرافة؟",
      introSub:
        "١٠ عبارات سريعة. اسحب لليمين للحقيقة، ولليسار للخرافة، أو اضغط مباشرة.",
      bestScore: (n) => `أفضل نتيجة: ${n} / ١٠`,
      letsGo: "يلا نبدأ",
      scoreLabel: (n) => `النتيجة: ${n}`,
      streakLabel: (n) => `🔥 ${n} متتالية`,
      statementNum: (n) => `العبارة ${n}`,
      swipeHint: "اسحب لليسار (خرافة) · اسحب لليمين (حقيقة) · أو اختر بالأسفل",
      mythBtn: "خرافة",
      factBtn: "حقيقة",
      correct: "إجابة صحيحة!",
      notQuite: "ليست دقيقة",
      itsFact: "إنها حقيقة",
      itsMyth: "إنها خرافة",
      next: "التالي",
      seeScore: "اعرض نتيجتي",
      outOfTen: "من ١٠",
      unlockedNote: "لقد حصلت على ختم محطّم الخرافات!",
      playAgain: "العب مجدداً",
      makeCard: "اصنع بطاقتي",
      learnMore: "تعلّم المزيد",
      headlines: {
        perfect: "محطّم الخرافات! 🏆",
        sharp: "عقل متّقد! 🧠",
        gettingThere: "أداء رائع! 💪",
        nowYouKnow: "الآن عرفت الحقيقة! 📚",
      },
    },
    learn: {
      tabs: {
        blood101: "أساسيات الدم",
        recovery: "التكوين والتعافي",
        components: "المكوّنات",
        bloodTypes: "فصائل الدم",
        match: "لعبة التوافق",
      },
      sections: {
        blood101: {
          eyebrow: "أساسيات الدم",
          title: "اكتشف ما يجري في عروقك",
          subtitle:
            "الدم الكامل ليس مجرد سائل أحمر — بل ثلاثة مكوّنات منقذة للحياة تعمل معاً.",
        },
        recovery: {
          eyebrow: "التكوين والتعافي",
          title: "كيف يعوّض جسمك كل قطرة",
          subtitle:
            "من مصنع نخاع العظم إلى جدول التعافي يوماً بيوم بعد التبرع.",
        },
        components: {
          eyebrow: "المكوّنات والمعالجة",
          title: "كيس واحد، ثلاث طرق للإنقاذ",
          subtitle:
            "بعد الجمع، يُفحص الدم ويُفصل ليصل كل مكوّن للمريض الذي يحتاجه.",
        },
        bloodTypes: {
          eyebrow: "فصائل الدم",
          title: "استكشف فصائل الدم والتوافق",
          subtitle:
            "اختر أي فصيلة لترى علاماتها السطحية ولمن تمنح وممّن تستقبل بأمان.",
        },
        match: {
          eyebrow: "لعبة سريعة",
          title: "اختبر مهارتك في مطابقة المتبرعين",
          subtitle:
            "هل يمكنك اختيار المتبرع الآمن بكرات الدم الحمراء للمريض في ٥ جولات؟",
        },
      },
      tube: {
        title: "ماذا يوجد داخل دمك؟",
        spunSub: "تم الفصل! اضغط على أي طبقة لتعرف وظيفتها.",
        idleSub:
          "يبدو الدم متجانساً باللون الأحمر حتى يدور في جهاز الطرد المركزي.",
        spinBtn: "دوّر الأنبوبة 🌀",
        spinningBtn: "جاري الفصل...",
        spinAgainBtn: "أعد التدوير 🌀",
        wholeBlood: "دم كامل",
        idleHint:
          "اضغط على «دوّر الأنبوبة» لمشاهدة الطرد المركزي وهو يفصل الدم إلى بلازما، وخلايا بيضاء وصفائح، وكرات دم حمراء.",
        unlocked: "تم فتح ختم باحث الدم!",
      },
      marrow: {
        title: "الدم يُصنع داخل عظامك",
        sub: "فور تبرعك، يُفعّل جسمك حلقة تعويض تلقائية ذكية.",
      },
      slider: {
        title: "جسمك بعد التبرع",
        sub: "حرّك المؤشر عبر الأيام لترى سرعة تجدد كل عنصر.",
        dayLabel: (d) => `اليوم ${d}`,
        sliderAria: "عدد الأيام بعد التبرع بالدم",
        restored: "اكتمل",
      },
      components: {
        shelfLife: "مدة الحفظ:",
        usedFor: "يُستخدم لـ",
      },
      journey: {
        title: "ماذا يحدث بعد سحب الدم؟",
        sub: "من كرسي التبرع إلى سرير المريض في ٥ خطوات دقيقة.",
      },
      explorer: {
        chooseAria: "اختر فصيلة دم لاستكشافها",
        giveTo: "يمنح كرات دم حمراء لـ",
        receiveFrom: "يستقبل كرات دم حمراء من",
        plasmaPrefix: "البلازما تعمل بالعكس: ",
        globalPrefix: "حول العالم: ",
        funFactPrefix: "هل تعلم؟ ",
        markerA: "علامة A",
        markerB: "علامة B",
        markerRhPos: "عامل RhD (+)",
        markerRhNeg: "بدون RhD (–)",
        markerZero: "لا توجد علامات A أو B أو RhD",
      },
      matchGame: {
        title: "طابق المتبرع المناسب",
        introSub:
          "٥ جولات مستشفى سريعة. اختر المتبرع الآمن بكرات الدم الحمراء لكل مريض.",
        startBtn: "ابدأ المطابقة",
        roundLabel: (c, t) => `الجولة ${c} / ${t}`,
        scoreLabel: (s) => `النتيجة: ${s}`,
        patientNeeds: "المريض يحتاج كرات دم حمراء",
        chooseDonor: "اختر المتبرع الآمن:",
        safeMatch: "توافق آمن!",
        unsafeMatch: "توافق غير آمن",
        next: "التالي",
        finish: "إنهاء",
        completeEyebrow: "انتهت لعبة المطابقة",
        completeScore: (s) => `${s} / ٥ مطابقات آمنة`,
        unlockedNote: "تم فتح ختم خبير الفصائل!",
        playAgain: "العب مجدداً",
        makeCard: "اصنع بطاقتي",
      },
    },
    donate: {
      tabs: {
        why: "لماذا يهم؟",
        eligibility: "هل أستطيع التبرع؟",
        day: "يوم التبرع",
        aftercare: "بعد التبرع",
      },
      sections: {
        why: {
          eyebrow: "لماذا يهم تبرعك؟",
          title: "شاهد إلى أين تصل تبرّعة واحدة",
          subtitle:
            "لأن الدم يُفصل إلى مكوّنات، تبرعك الواحد يمكن أن يساعد حتى ٣ مرضى مختلفين.",
        },
        eligibility: {
          eyebrow: "هل أستطيع التبرع؟",
          title: "فحص سريع في ٣٠ ثانية",
          subtitle: "أجب عن ٧ أسئلة بسيطة لمعرفة إن كان اليوم مناسباً للتبرع.",
        },
        day: {
          eyebrow: "يوم التبرع",
          title: "ماذا يحدث فعلياً في نقطة التبرع؟",
          subtitle: "أربع خطوات هادئة وواضحة من التسجيل حتى العصير والراحة.",
        },
        aftercare: {
          eyebrow: "قبل وبعد التبرع",
          title: "قائمة التحضير والعناية بعد التبرع",
          subtitle: "اضغط على كل نصيحة لتعليمها قبل توجهك للتبرع أو بعد انتهائك.",
        },
      },
      split: {
        tapBtn: "اضغط لفصل تبرّع واحد",
        helpsLabel: "يساعد",
        oneToThree: "تبرّع واحد ← حتى ٣ أرواح.",
        replay: "إعادة العرض",
        whoNeedsTitle: "من يحتاجون إلى الدم المتبرع به؟",
      },
      eligibility: {
        questionOf: (c, t) => `سؤال ${c} من ${t}`,
        quickTag: "فحص ٣٠ ثانية",
        yes: "نعم",
        no: "لا",
        na: "لا ينطبق",
        unlockedNote: "تم فتح ختم جاهز للتبرع!",
        askBoothLabel: "نقاط يُفضل سؤال الفريق الطبي عنها:",
        startOver: "إعادة الفحص",
        makeCard: "اصنع بطاقتي",
      },
      steps: {
        totalPrefix: "إجمالي الوقت من الدخول حتى الضيافة:",
      },
      checklists: {
        beforeTitle: "قبل التبرع",
        afterTitle: "بعد التبرع",
        proAftercare: "أنت محترف في العناية بعد التبرع ✨",
      },
    },
    card: {
      createTitle: "اصنع بطاقة المتبرع الخاصة بك",
      editTitle: "تعديل بطاقة المتبرع",
      formSub:
        "خصّص بطاقتك التفاعلية لحملة NASU واحفظها كصورة على هاتفك.",
      firstName: "الاسم الأول",
      namePlaceholder: "مثال: سلمى",
      nameError: "من فضلك أدخل اسمك الأول لإنشاء البطاقة.",
      bloodTypeLabel: "فصيلة الدم",
      unknownBtn: "لا أعرف فصيلتي بعد",
      finishLabel: "تصميم البطاقة",
      finishes: {
        crimson: "أحمر قرمزي",
        midnight: "ياقوت ليلي",
        pearl: "لؤلؤي ناعم",
      },
      donatedTodayLabel: "تبرعت اليوم 🩸",
      submitCreate: "إنشاء بطاقتي",
      submitSave: "حفظ التعديلات",
      cancel: "إلغاء",
      viewTitle: "بطاقة المتبرع الخاصة بك",
      viewSub: "حرّك المؤشر على البطاقة للمعان ثلاثي الأبعاد، أو اضغط لقلبها.",
      donatedHeroBadge: "تبرّع اليوم · بطل",
      idLabel: "رقم البطاقة:",
      todayDate: "اليوم",
      canGiveTo: "يمنح لـ",
      canReceiveFrom: "يستقبل من",
      stampsHeading: "أختام الحملة",
      download: "تحميل",
      share: "مشاركة",
      flip: "قلب",
      edit: "تعديل",
      downloadedToast: "تم تحميل صورة البطاقة.",
      downloadErr: "تعذر إنشاء الصورة. حاول مرة أخرى.",
      sharedToast: "تمت المشاركة!",
      shareFallbackToast: "المشاركة غير مدعومة هنا — تم التحميل بدلاً من ذلك.",
      shareErr: "تعذر المشاركة الآن. جرّب زر التحميل.",
      collectTitle: "اجمع كل الأختام",
      collectSub: "الأختام التي تفتحها تظهر تلقائياً على ظهر بطاقتك.",
      shareCardTitle: "بطاقة المتبرع الخاصة بي — NASU",
      shareCardText: "أنشأت للتو بطاقتي التفاعلية في حملة NASU للتبرع بالدم 🩸",
      downloadModalTitle: "اختر شكل تحميل البطاقة",
      downloadFront: "الوجه الأمامي فقط",
      downloadBack: "الوجه الخلفي فقط (الأختام و QR)",
      downloadCombined: "الوجهان في صورة واحدة",
      downloadSeparate: "صورتان منفصلتان (الأمامي + الخلفي)",
      iosSaveTitle: "احفظ بطاقتك في الصور",
      iosSaveHint: "اضغط مطولاً على الصورة بالأسفل ثم اختر (حفظ في الصور).",
      iosSaveClose: "إغلاق",
    },
    share: {
      eyebrow: "شارك الأثر",
      title: "شارك الموقع مع صديقك",
      subtitle:
        "خلّي صاحبك يمسح الكود مباشرة من شاشتك، أو ابعتله الرابط في ثانية — كل مشاركة ممكن تنقذ ٣ أرواح.",
      scanHint: "امسح الكود لفتح الحملة",
      fullscreenBtn: "تكبير للمسح",
      fullscreenHint: "وجّه كاميرا هاتف صديقك نحو الكود",
      closeModal: "إغلاق",
      shareNative: "شارك الآن",
      whatsapp: "واتساب",
      copyLink: "نسخ الرابط",
      copied: "تم النسخ!",
      saveQr: "حفظ بطاقة الكود",
      savingQr: "جارٍ الحفظ...",
      savedToast: "تم حفظ بطاقة الكود بنجاح.",
      sharedToast: "تمت المشاركة! شكراً لنشر الأثر.",
      shareErr: "تعذر إتمام العملية الآن. جرّب نسخ الرابط.",
      shareTitle: "حملة NASU للتبرع بالدم",
      shareMessage:
        "تبرّع واحد ممكن ينقذ ٣ أرواح 🩸 جرّب تحدي الدقيقتين واصنع بطاقة المتبرع الخاصة بك في حملة جامعة عين شمس الأهلية:",
      footerShareLink: "شارك الموقع عبر QR",
      steps: [
        {
          title: "اعرض الكود",
          body: "افتح شاشة المسح المكبّرة أمام صديقك.",
        },
        {
          title: "مسح فوري",
          body: "يفتح الموقع مباشرة من كاميرا الهاتف بدون تطبيقات.",
        },
        {
          title: "ضاعف الأثر",
          body: "كل صديق ينضم قد يساهم في إنقاذ حتى ٣ أرواح.",
        },
      ],
    },
  },
  en: {
    nav: {
      home: "Home",
      play: "Play",
      learn: "Learn",
      donate: "Donate",
      card: "Card",
      share: "Share",
      switchToOtherLang: "عربي",
      switchLangAria: "التبديل إلى اللغة العربية",
      toDarkAria: "Switch to dark mode",
      toLightAria: "Switch to light mode",
    },
    toast: {
      stampUnlocked: "Stamp unlocked",
    },
    home: {
      eyebrow: "NASU Blood Donation Campaign",
      heroLine1: "One donation.",
      heroHighlight: "Up to three lives.",
      heroSub:
        "Bust the myths, meet your blood, and walk away with your own donor card, all in about 5 minutes.",
      ctaChallenge: "Start the 2-min challenge",
      ctaCard: "Make my donor card",
      tapDrop: "Tap the drop",
      pulseSynced: (n) => `Pulse synced ×${n}`,
      marqueeItems: [
        "One donation = up to 3 lives",
        "Plasma restores in 24–48h",
        "~10 min actual donation",
        "100% sterile single-use kit",
        "Free blood typing after donation",
        "Marrow makes 2M red cells/sec",
      ],
      journeyHeading: "Your journey",
      journeyDuration: "~5 min total",
      cardCreatedBadge: "Card created",
      cardCollectBadge: "Collect reward",
      stampsHeading: (c) => `You've collected ${c}/4 stamps`,
      stampsSub:
        "Explore each section to unlock all four stamps on the back of your donor card.",
      viewMyCard: "View my card",
      closingCta:
        "Ready to give? Find the NASU campaign team at the donation booth.",
    },
    play: {
      title: "Fact or Myth?",
      introSub:
        "10 statements. Swipe right for Fact, left for Myth, or just tap.",
      bestScore: (n) => `Best score: ${n} / 10`,
      letsGo: "Let's go",
      scoreLabel: (n) => `Score: ${n}`,
      streakLabel: (n) => `🔥 ${n} streak`,
      statementNum: (n) => `Statement ${n}`,
      swipeHint: "Swipe left for Myth · Swipe right for Fact · Or tap below",
      mythBtn: "Myth",
      factBtn: "Fact",
      correct: "Correct!",
      notQuite: "Not quite",
      itsFact: "It's a FACT",
      itsMyth: "It's a MYTH",
      next: "Next",
      seeScore: "See my score",
      outOfTen: "out of 10",
      unlockedNote: "You earned the Myth Buster stamp!",
      playAgain: "Play again",
      makeCard: "Make my donor card",
      learnMore: "Learn more",
      headlines: {
        perfect: "Myth Destroyer! 🏆",
        sharp: "Sharp mind! 🧠",
        gettingThere: "Getting there! 💪",
        nowYouKnow: "Now you know! 📚",
      },
    },
    learn: {
      tabs: {
        blood101: "Blood 101",
        recovery: "Made & Restored",
        components: "Components",
        bloodTypes: "Blood Types",
        match: "Match Game",
      },
      sections: {
        blood101: {
          eyebrow: "Blood 101",
          title: "Meet what flows through you",
          subtitle:
            "Whole blood is more than red liquid — it's three lifesaving parts working together.",
        },
        recovery: {
          eyebrow: "Made & Restored",
          title: "How your body replaces every drop",
          subtitle:
            "From your bone marrow factory to day-by-day recovery after donating.",
        },
        components: {
          eyebrow: "Components & Processing",
          title: "One bag, three different rescues",
          subtitle:
            "After collection, blood is tested and separated so each component goes where it helps most.",
        },
        bloodTypes: {
          eyebrow: "Blood Groups",
          title: "Explore blood types & compatibility",
          subtitle:
            "Pick any blood type to see its markers and who it can safely give to or receive from.",
        },
        match: {
          eyebrow: "Mini-Game",
          title: "Put your compatibility skills to work",
          subtitle:
            "Can you match a safe red-cell donor to the patient in five quick rounds?",
        },
      },
      tube: {
        title: "What's inside your blood?",
        spunSub: "Separated! Tap any layer to see what it does.",
        idleSub:
          "Whole blood looks solid red until a centrifuge spins it apart.",
        spinBtn: "Spin the tube 🌀",
        spinningBtn: "Spinning...",
        spinAgainBtn: "Spin again 🌀",
        wholeBlood: "Whole blood",
        idleHint:
          "Press Spin the tube to watch centrifuge gravity split whole blood into plasma, white cells & platelets, and red blood cells.",
        unlocked: "Blood Scholar stamp unlocked!",
      },
      marrow: {
        title: "Blood is made inside your bones",
        sub: "Right after you donate, your body automatically triggers a rebuild loop.",
      },
      slider: {
        title: "Your body after donating",
        sub: "Slide through the days to see how fast each part bounces back.",
        dayLabel: (d) => `Day ${d}`,
        sliderAria: "Days since blood donation",
        restored: "Restored",
      },
      components: {
        shelfLife: "Shelf life:",
        usedFor: "Used for",
      },
      journey: {
        title: "What happens after your blood is collected?",
        sub: "From the donation chair to a hospital bedside in 5 careful steps.",
      },
      explorer: {
        chooseAria: "Choose a blood type to explore",
        giveTo: "Can give red cells to",
        receiveFrom: "Can receive red cells from",
        plasmaPrefix: "Plasma works in reverse: ",
        globalPrefix: "Global note: ",
        funFactPrefix: "Did you know? ",
        markerA: "A marker",
        markerB: "B marker",
        markerRhPos: "RhD (+)",
        markerRhNeg: "No RhD (–)",
        markerZero: "Zero A, B or RhD markers",
      },
      matchGame: {
        title: "Match the Donor",
        introSub:
          "5 quick hospital rounds. Pick the one safe red-cell donor for each patient.",
        startBtn: "Start matching",
        roundLabel: (c, t) => `Round ${c} / ${t}`,
        scoreLabel: (s) => `Score: ${s}`,
        patientNeeds: "Patient needs red cells",
        chooseDonor: "Choose the safe donor:",
        safeMatch: "Safe match!",
        unsafeMatch: "Not a safe match",
        next: "Next",
        finish: "Finish",
        completeEyebrow: "Match Game Complete",
        completeScore: (s) => `${s} / 5 safe matches`,
        unlockedNote: "You unlocked the Type Expert stamp!",
        playAgain: "Play again",
        makeCard: "Make my donor card",
      },
    },
    donate: {
      tabs: {
        why: "Why it matters",
        eligibility: "Can I donate?",
        day: "Donation day",
        aftercare: "Aftercare",
      },
      sections: {
        why: {
          eyebrow: "Why It Matters",
          title: "See how far one donation goes",
          subtitle:
            "Because blood is separated into parts, a single donation can reach up to three different patients.",
        },
        eligibility: {
          eyebrow: "Can I Donate?",
          title: "30-second quick check",
          subtitle:
            "Answer 7 simple questions to see if today looks like a good day to donate.",
        },
        day: {
          eyebrow: "Donation Day",
          title: "What actually happens at the booth",
          subtitle: "Four calm, straightforward steps from check-in to snacks.",
        },
        aftercare: {
          eyebrow: "Before & After",
          title: "Your donation-day checklists",
          subtitle:
            "Tap each tip to check it off before you walk up or right after you finish.",
        },
      },
      split: {
        tapBtn: "Tap to split one donation",
        helpsLabel: "Helps",
        oneToThree: "One donation → up to 3 lives.",
        replay: "Replay",
        whoNeedsTitle: "Who needs donated blood?",
      },
      eligibility: {
        questionOf: (c, t) => `Question ${c} of ${t}`,
        quickTag: "30-second check",
        yes: "Yes",
        no: "No",
        na: "Not applicable",
        unlockedNote: "Donor Ready stamp unlocked!",
        askBoothLabel: "Items to ask the booth team about:",
        startOver: "Start over",
        makeCard: "Make my donor card",
      },
      steps: {
        totalPrefix: "Total time from walk-in to snack:",
      },
      checklists: {
        beforeTitle: "Before you donate",
        afterTitle: "After you donate",
        proAftercare: "You're a pro at aftercare ✨",
      },
    },
    card: {
      createTitle: "Make your donor card",
      editTitle: "Edit your donor card",
      formSub:
        "Personalize your interactive NASU Blood Drive card and save it to your phone.",
      firstName: "First name",
      namePlaceholder: "e.g. Salma",
      nameError: "Please enter your first name to create your card.",
      bloodTypeLabel: "Blood type",
      unknownBtn: "I don't know yet",
      finishLabel: "Card finish",
      finishes: {
        crimson: "Crimson Foil",
        midnight: "Midnight Ruby",
        pearl: "Pearl Pulse",
      },
      donatedTodayLabel: "I donated today 🩸",
      submitCreate: "Create my card",
      submitSave: "Save changes",
      cancel: "Cancel",
      viewTitle: "Your NASU Donor Card",
      viewSub: "Move across the card for 3D shimmer, or tap to flip it over.",
      donatedHeroBadge: "Donated today · Hero",
      idLabel: "ID:",
      todayDate: "Today",
      canGiveTo: "Can give red cells to",
      canReceiveFrom: "Can receive from",
      stampsHeading: "Campaign Stamps",
      download: "Download",
      share: "Share",
      flip: "Flip",
      edit: "Edit",
      downloadedToast: "Card PNG downloaded.",
      downloadErr: "Could not generate image. Please try again.",
      sharedToast: "Shared!",
      shareFallbackToast: "Sharing isn't supported here — downloaded instead.",
      shareErr: "Could not share right now. Try Download instead.",
      collectTitle: "Collect all stamps",
      collectSub:
        "Your earned stamps appear automatically on the back of your card.",
      shareCardTitle: "My NASU Donor Card",
      shareCardText:
        "I just made my donor card at the NASU Blood Donation Campaign 🩸",
      downloadModalTitle: "Choose how to download",
      downloadFront: "Front side only",
      downloadBack: "Back side only (Stamps & QR)",
      downloadCombined: "Both sides in one image",
      downloadSeparate: "Two separate images (Front + Back)",
      iosSaveTitle: "Save card to Photos",
      iosSaveHint: "Press and hold the image below, then tap Save to Photos.",
      iosSaveClose: "Close",
    },
    share: {
      eyebrow: "Pass the drop",
      title: "Share in one scan",
      subtitle:
        "Let a friend scan straight from your screen, or send the link in a tap — one share can spark up to 3 lives saved.",
      scanHint: "Scan to open campaign",
      fullscreenBtn: "Full-screen QR",
      fullscreenHint: "Point your friend's camera at the code",
      closeModal: "Close",
      shareNative: "Share now",
      whatsapp: "WhatsApp",
      copyLink: "Copy link",
      copied: "Copied!",
      saveQr: "Save QR card",
      savingQr: "Saving...",
      savedToast: "QR card image saved.",
      sharedToast: "Shared! Thanks for spreading the drop.",
      shareErr: "Could not complete right now. Try copying the link.",
      shareTitle: "NASU Blood Donation Campaign",
      shareMessage:
        "One donation can save up to 3 lives 🩸 Try the 2-min challenge and make your NASU donor card:",
      footerShareLink: "Share via QR",
      steps: [
        {
          title: "Show the code",
          body: "Open full-screen QR mode right on your screen.",
        },
        {
          title: "Instant scan",
          body: "Opens straight from any phone camera — no app needed.",
        },
        {
          title: "Multiply impact",
          body: "Every friend who joins can help save up to 3 lives.",
        },
      ],
    },
  },
};
