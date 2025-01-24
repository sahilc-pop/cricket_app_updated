export type TMayBe<T> = T | null | undefined;

export type TPlayerType = "batsman" | "bowler" | "allRounder" | "wicketKeeper";

export type TPlayer = {
    id?: TMayBe<string>;
    name?: TMayBe<string>;
    description?: TMayBe<string>;
    type?: TMayBe<TPlayerType>;
    points?: TMayBe<number>;
    rank?: TMayBe<number>;
    dob?: TMayBe<number>;
};