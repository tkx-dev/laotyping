<template>
  <section
    class="mt-16 pt-8 border-t border-theme-border/40 font-lao text-theme-muted text-sm space-y-8"
    aria-label="ຂໍ້ມູນ ແລະ ຄຳແນະນຳການຝຶກພິມດີດພາສາລາວ"
  >
    <!-- About Section -->
    <div class="space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-theme-primary flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-theme-accent inline-block" />
        LaoType — ເວັບໄຊຝຶກພິມດີດ ແລະ ທົດສອບຄວາມໄວພາສາລາວອອນລາຍ
      </h2>
      <p class="leading-relaxed text-theme-muted">
        <strong>LaoType</strong> ເປັນເວັບໄຊທົດສອບ ແລະ ຝຶກພິມດີດພາສາລາວອອນລາຍຟຣີ (Lao Typing Speed Test) ທີ່ອອກແບບມາເພື່ອຊ່ວຍໃຫ້ນັກຮຽນ, ນັກສຶກສາ ແລະ ພະນັກງານທົ່ວໄປ ສາມາດຝຶກທັກສະການພິມດີດພາສາລາວໃຫ້ມີຄວາມໄວ, ຖືກຕ້ອງ ແລະ ຄ່ອງແຄ້ວຫຼາຍຂຶ້ນ ດ້ວຍລະບົບວັດແທກຄວາມໄວ WPM (Words Per Minute), CPM (Characters Per Minute) ແລະ ຄວາມຖືກຕ້ອງ (Accuracy) ແບບ Real-time.
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 rounded-xl bg-theme-surface/50 border border-theme-border/40 space-y-2">
        <h3 class="font-medium text-theme-primary text-sm flex items-center gap-1.5">
          <span class="text-theme-accent">⚡</span> ວັດແທກ WPM & Accuracy
        </h3>
        <p class="text-xs text-theme-muted leading-relaxed">
          ຄິດໄລ່ຄວາມໄວການພິມຕາມມາດຕະຖານສາກົນ ພ້ອມລາຍງານສະຖິຕິລະອຽດ, ອັດຕາຄວາມຖືກຕ້ອງ ແລະ ຄ່າ Combo ສູງສຸດ.
        </p>
      </div>

      <div class="p-4 rounded-xl bg-theme-surface/50 border border-theme-border/40 space-y-2">
        <h3 class="font-medium text-theme-primary text-sm flex items-center gap-1.5">
          <span class="text-theme-accent">⌨️</span> ແປ້ນພິມຈຳລອງ (Virtual Keyboard)
        </h3>
        <p class="text-xs text-theme-muted leading-relaxed">
          ແຜນຜັງແປ້ນພິມພາສາລາວມາດຕະຖານ ຊ່ວຍແນະນຳຕຳແໜ່ງນິ້ວມື ແລະ ປຸ່ມກົດຖັດໄປ ເພື່ອພັດທະນາການພິມແບບສຳຜັດ (Touch Typing).
        </p>
      </div>

      <div class="p-4 rounded-xl bg-theme-surface/50 border border-theme-border/40 space-y-2">
        <h3 class="font-medium text-theme-primary text-sm flex items-center gap-1.5">
          <span class="text-theme-accent">🎯</span> ໂໝດທີ່ຫຼາກຫຼາຍ & ສຽງກົດປຸ່ມ
        </h3>
        <p class="text-xs text-theme-muted leading-relaxed">
          ຮອງຮັບທັງໂໝດເວລາ (15s, 30s, 60s, 120s), ໂໝດຈຳນວນຄຳ, ບົດຮຽນຝຶກພິມ (Lessons) ແລະ ສຽງຕອບສະໜອງ Mechanical Switch.
        </p>
      </div>
    </div>

    <!-- Typing Tips -->
    <div class="space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-theme-primary flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-theme-accent inline-block" />
        ເຄັດລັບການຝຶກພິມດີດພາສາລາວໃຫ້ໄວ ແລະ ຖືກຕ້ອງ
      </h2>
      <ul class="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-theme-muted leading-relaxed pl-1">
        <li><strong>ວາງຕຳແໜ່ງມືໃຫ້ຖືກຕ້ອງ:</strong> ວາງນິ້ວມືທັງ 8 ໄວ້ເທິງແຖວຫຼັກ (Home Row Keys: ຟ ຫ ກ ດ ແລະ ່ າ ສ ວ) ເພື່ອໃຫ້ສາມາດກົດປຸ່ມອື່ນໆ ໄດ້ວ່ອງໄວ.</li>
        <li><strong>ຝຶກພິມແບບບໍ່ແນມແປ້ນພິມ:</strong> ໃຊ້ແປ້ນພິມຈຳລອງຂອງ LaoType ເພື່ອຊ່ວຍຝຶກກ້າມຊີ້ນມື (Muscle Memory).</li>
        <li><strong>ເນັ້ນຄວາມຖືກຕ້ອງກ່ອນຄວາມໄວ:</strong> ຄວາມຖືກຕ້ອງ (Accuracy) ທີ່ສູງກວ່າ 95% ຈະຊ່ວຍໃຫ້ຄວາມໄວ WPM ເພີ່ມຂຶ້ນຢ່າງເປັນທຳມະຊາດ.</li>
        <li><strong>ຝຶກຝົນຢ່າງສະໝ່ຳສະເໝີ:</strong> ຝຶກມື້ລະ 10-15 ນາທີ ທຸກໆ ມື້ ຈະຊ່ວຍພັດທະນາທັກສະໄດ້ໄວກວ່າການຝຶກດົນໆ ພຽງອາທິດລະຄັ້ງ.</li>
      </ul>
    </div>

    <!-- FAQ Accordion for Search Engine Rich Snippets -->
    <div class="space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-theme-primary flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-theme-accent inline-block" />
        ຄຳຖາມທີ່ພົບເລື້ອຍ (FAQ)
      </h2>
      <div class="space-y-2">
        <details class="group p-3.5 rounded-xl bg-theme-surface/40 border border-theme-border/40 cursor-pointer">
          <summary class="font-medium text-theme-primary text-xs sm:text-sm flex items-center justify-between select-none">
            <span>WPM ແມ່ນຫຍັງ ແລະ ວັດແທກຄວາມໄວແນວໃດ?</span>
            <span class="text-theme-muted transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p class="mt-2 text-xs text-theme-muted leading-relaxed pl-1">
            WPM ຫຍໍ້ມາຈາກ Words Per Minute (ຈຳນວນຄຳຕໍ່ນາທີ). ລະບົບຄຳນວນຈາກຈຳນວນຕົວອັກສອນທີ່ພິມຖືກຕ້ອງຫານດ້ວຍ 5 (ມາດຕະຖານສາກົນ) ແລ້ວຫານດ້ວຍເວລາທີ່ໃຊ້ເປັນນາທີ.
          </p>
        </details>

        <details class="group p-3.5 rounded-xl bg-theme-surface/40 border border-theme-border/40 cursor-pointer">
          <summary class="font-medium text-theme-primary text-xs sm:text-sm flex items-center justify-between select-none">
            <span>ສາມາດຝຶກພິມດີດພາສາອັງກິດໄດ້ບໍ່?</span>
            <span class="text-theme-muted transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p class="mt-2 text-xs text-theme-muted leading-relaxed pl-1">
            ໄດ້ແນ່ນອນ! ທ່ານສາມາດກົດປ່ຽນພາສາເປັນ English ຢູ່ແຖບຄວບຄຸມດ້ານເທິງເພື່ອທົດສອບຄວາມໄວການພິມພາສາອັງກິດໄດ້ທຸກເວລາ.
          </p>
        </details>

        <details class="group p-3.5 rounded-xl bg-theme-surface/40 border border-theme-border/40 cursor-pointer">
          <summary class="font-medium text-theme-primary text-xs sm:text-sm flex items-center justify-between select-none">
            <span>LaoType ເຮັດວຽກເທິງມືຖື ແລະ ແທັບເລັດໄດ້ບໍ່?</span>
            <span class="text-theme-muted transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p class="mt-2 text-xs text-theme-muted leading-relaxed pl-1">
            ຮອງຮັບໄດ້ທຸກອຸປະກອນ ທັງຄອມພິວເຕີ, ແລັບທັອບ, iPad, ແທັບເລັດ ແລະ ໂທລະສັບມືຖື ພ້ອມຮອງຮັບແປ້ນພິມພາຍນອກ (Physical Keyboard).
          </p>
        </details>
      </div>
    </div>
  </section>
</template>
