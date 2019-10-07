module.exports = function(zone, ew, nw) {
    /* Copyright (c) 2006, HELMUT H. HEIMEIER
    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included
    in all copies or substantial portions of the Software.*/

    /* Die Funktion wandelt UTM Koordinaten in geographische Koordinaten
    um. UTM Zone, Ostwert ew und Nordwert nw müssen gegeben sein.
    Berechnet werden geographische Länge lw und Breite bw im WGS84 Datum.*/

    // Längenzone zone, Ostwert ew und Nordwert nw im WGS84 Datum
    if (zone == "" || ew == "" || nw == "") {
        zone = "";
        ew = "";
        nw = "";
        return;
    }
    band = zone.substr(2, 1);
    zone = parseFloat(zone);
    ew = parseFloat(ew);
    nw = parseFloat(nw);

    // WGS84 Datum
    // Große Halbachse a und Abplattung f
    a = 6378137.000;
    f = 3.35281068e-3;
    pi = Math.PI;

    // Polkrümmungshalbmesser c
    c = a / (1 - f);

    // Quadrat der zweiten numerischen Exzentrizität
    ex2 = (2 * f - f * f) / ((1 - f) * (1 - f));
    ex4 = ex2 * ex2;
    ex6 = ex4 * ex2;
    ex8 = ex4 * ex4;

    // Koeffizienten zur Berechnung der geographischen Breite aus gegebener
    // Meridianbogenlänge
    e0 = c * (pi / 180) * (1 - 3 * ex2 / 4 + 45 * ex4 / 64 - 175 * ex6 / 256 + 11025 * ex8 / 16384);
    f2 = (180 / pi) * (3 * ex2 / 8 - 3 * ex4 / 16 + 213 * ex6 / 2048 - 255 * ex8 / 4096);
    f4 = (180 / pi) * (21 * ex4 / 256 - 21 * ex6 / 256 + 533 * ex8 / 8192);
    f6 = (180 / pi) * (151 * ex6 / 6144 - 453 * ex8 / 12288);

    // Entscheidung Nord-/Süd Halbkugel
    if (band >= "N" || band == "")
        m_nw = nw
    else
        m_nw = nw - 10e6;

    // Geographische Breite bf zur Meridianbogenlänge gf = m_nw
    sigma = (m_nw / 0.9996) / e0;
    sigmr = sigma * pi / 180;
    bf = sigma + f2 * Math.sin(2 * sigmr) + f4 * Math.sin(4 * sigmr) + f6 * Math.sin(6 * sigmr);

    // Breite bf in Radianten
    br = bf * pi / 180;
    tan1 = Math.tan(br);
    tan2 = tan1 * tan1;
    tan4 = tan2 * tan2;

    cos1 = Math.cos(br);
    cos2 = cos1 * cos1;

    etasq = ex2 * cos2;

    // Querkrümmungshalbmesser nd
    nd = c / Math.sqrt(1 + etasq);
    nd2 = nd * nd;
    nd4 = nd2 * nd2;
    nd6 = nd4 * nd2;
    nd3 = nd2 * nd;
    nd5 = nd4 * nd;

    // Längendifferenz dl zum Bezugsmeridian lh
    lh = (zone - 30) * 6 - 3;
    dy = (ew - 500000) / 0.9996;
    dy2 = dy * dy;
    dy4 = dy2 * dy2;
    dy3 = dy2 * dy;
    dy5 = dy3 * dy2;
    dy6 = dy3 * dy3;

    b2 = -tan1 * (1 + etasq) / (2 * nd2);
    b4 = tan1 * (5 + 3 * tan2 + 6 * etasq * (1 - tan2)) / (24 * nd4);
    b6 = -tan1 * (61 + 90 * tan2 + 45 * tan4) / (720 * nd6);

    l1 = 1 / (nd * cos1);
    l3 = -(1 + 2 * tan2 + etasq) / (6 * nd3 * cos1);
    l5 = (5 + 28 * tan2 + 24 * tan4) / (120 * nd5 * cos1);

    // Geographische Breite bw und Länge lw als Funktion von Ostwert ew
    // und Nordwert nw
    bw = bf + (180 / pi) * (b2 * dy2 + b4 * dy4 + b6 * dy6);
    lw = lh + (180 / pi) * (l1 * dy + l3 * dy3 + l5 * dy5);
    return {
        latitude : bw,
        longitude : lw
    };
}; 