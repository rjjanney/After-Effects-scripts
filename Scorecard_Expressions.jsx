# for the par holes
comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Par") + 2

# for the score holes
comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Score");

# back nine total
(comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 1")("Score") + comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 2")("Score") + comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 3")("Score") + comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 4")("Score") + comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 5")("Score") + comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 6")("Score") + comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 7")("Score") + comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 8")("Score") + comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Score"));

# for birdies/bogeys
# triple
if ( (comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Par")) + 2 - comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Score") < -2) {
100;
}else{
0;
}

# double
if ( (comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Par")) + 2 - comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Score") == -2) {
100;
}else{
0;
}

# bogey
if ( (comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Par")) + 2 - comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Score") == -1) {
100;
}else{
0;
}

 # birdie
if ( (comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Par")) + 2 - comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Score") == 1) {
100;
}else{
0;
}

# eagle
if ( (comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Par")) + 2 - comp("_Stat_BASE_Scorecard").layer("MATTE").effect("Hole 9")("Score") > 1) {
100;
}else{
0;
}
