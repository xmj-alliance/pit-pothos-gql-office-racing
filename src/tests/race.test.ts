import { assertEquals } from "std/testing/asserts.ts";
import { RaceService } from "src/services/race.service.ts";
import { IInputRace, IRace } from "src/models/interfaces/race.interface.ts";

Deno.test(
  { name: "Race CRUD" },
  async (t) => {
    const raceService = new RaceService();

    const newRaces: IInputRace[] = [
      {
        date: new Date("2022-04-04"),
        scene: "The Corridor",
        racerMap: {
          "f301bafa-15cf-496c-b5fc-a3c7459887a5":
            "73749394-3246-4906-8637-c1171a9861ef",
          "5eebadd0-35d4-4059-bed3-b52b030f9b88":
            "b4c55097-4042-4b01-a502-9e5294f99fb8",
          "46a7458a-eada-464f-aa48-0fcf8ab3fe9d":
            "4b33328f-c958-4d5d-98d3-c77ff7a24219",
        },
      },
      {
        scene: "Prosper Alley",
        racerMap: {
          "f301bafa-15cf-496c-b5fc-a3c7459887a5":
            "73749394-3246-4906-8637-c1171a9861ef",
          "5eebadd0-35d4-4059-bed3-b52b030f9b88":
            "b4c55097-4042-4b01-a502-9e5294f99fb8",
          "46a7458a-eada-464f-aa48-0fcf8ab3fe9d":
            "4b33328f-c958-4d5d-98d3-c77ff7a24219",
        },
      },
      {
        scene: "Printer Canyon",
        racerMap: {
          "f301bafa-15cf-496c-b5fc-a3c7459887a5":
            "73749394-3246-4906-8637-c1171a9861ef",
          "5eebadd0-35d4-4059-bed3-b52b030f9b88":
            "b4c55097-4042-4b01-a502-9e5294f99fb8",
          "46a7458a-eada-464f-aa48-0fcf8ab3fe9d":
            "4b33328f-c958-4d5d-98d3-c77ff7a24219",
        },
      },
    ];

    const raceSceneMap: { [scene: string]: IRace } = {};

    await t.step("add races", () => {
      const addedRaces = raceService.addRaces(newRaces);

      const newIDs: string[] = [];
      for (const race of addedRaces) {
        raceSceneMap[race.scene] = race;
        newIDs.push(race.id);
      }

      const currentRaces = raceService.getByIDs(newIDs);

      assertEquals(currentRaces.length, newRaces.length);
    });

    await t.step("search races", () => {
      // the search function is currently case sensitive
      const searchedRaces = raceService.search("Pr");
      // Should contain {scene: "Prosper Alley",} and {scene: "Printer Canyon",}
      assertEquals(searchedRaces.length, 2);
    });

    await t.step("update races", () => {
      const pCanyon = raceSceneMap["Printer Canyon"];

      const changedPCanyon: IInputRace = {
        ...pCanyon,
        racerMap: Object.fromEntries(pCanyon.racerMap) as any,
      };

      changedPCanyon.date = new Date();

      const updatedRaces = raceService.updateRaces([changedPCanyon]);

      assertEquals(updatedRaces.length, 1);
      assertEquals(updatedRaces[0].date, changedPCanyon.date);
    });

    await t.step("delete races", () => {
      const tCorridor = raceSceneMap["The Corridor"];
      const pAlley = raceSceneMap["Prosper Alley"];
      const deletingRaces = [tCorridor, pAlley];

      const deletedRaces = raceService.deleteByIDs([tCorridor.id, pAlley.id]);
      assertEquals(deletedRaces.length, deletingRaces.length);
      const remainingRaces = raceService.getAll();
      assertEquals(
        remainingRaces.length,
        newRaces.length - deletingRaces.length,
      );
    });
  },
);
