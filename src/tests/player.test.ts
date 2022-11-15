import { assertEquals } from "std/testing/asserts.ts";
import {
  IInputPlayer,
  IPlayer,
} from "src/models/interfaces/player.interface.ts";
import { PlayerService } from "src/services/player.service.ts";

Deno.test(
  { name: "Player CRUD" },
  async (t) => {
    const playerService = new PlayerService();

    const newPlayers: IInputPlayer[] = [
      {
        name: "IAMTheBoss",
        description: "Super code-blooded manager at tech department.",
      },
      {
        name: "Concierge Lily",
        description:
          "The lady responsible for property management (but 99% time doing floor sweeping)",
      },
      {
        name: "Yoyo",
        description:
          "Popular cat in the office who likes bashing other's keyboard.",
      },
    ];

    const playerNameMap: { [name: string]: IPlayer } = {};

    await t.step("add players", () => {
      const addedPlayers = playerService.add(newPlayers);

      const newIDs: string[] = [];
      for (const player of addedPlayers) {
        playerNameMap[player.name] = player;
        newIDs.push(player.id);
      }

      const currentPlayers = playerService.getByIDs(newIDs);

      assertEquals(currentPlayers.length, newPlayers.length);
    });

    await t.step("search players", () => {
      // the search function is currently case sensitive
      const searchedPlayers = playerService.search("The");
      // Should contain {name: "IAMTheBoss"} and {description: "The lady ..."}
      assertEquals(searchedPlayers.length, 2);
    });

    await t.step("update players", () => {
      const yoyo = playerNameMap["Yoyo"];

      yoyo.description = "Super adorable kitten that loves f(ph?)ishing.";

      const updatedPlayers = playerService.update([yoyo]);

      assertEquals(updatedPlayers.length, 1);
      assertEquals(updatedPlayers[0].description, yoyo.description);
    });

    await t.step("delete players", () => {
      const boss = playerNameMap["IAMTheBoss"];
      const lily = playerNameMap["Concierge Lily"];
      const deletedPlayers = playerService.deleteByIDs([boss.id, lily.id]);
      assertEquals(deletedPlayers.length, 2);
      const remainingPlayers = playerService.getAll();
      assertEquals(remainingPlayers.length, newPlayers.length - 2);
    });
  },
);
