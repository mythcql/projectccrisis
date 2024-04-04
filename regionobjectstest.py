class region:
    def __init__ (self, controlscore, resourcetype, city, infantryunits, armorunits):
        self.controlscore = controlscore
        self.resourcetype = resourcetype
        self.city = city
        self.infantryunits = infantryunits
        self.armorunits = armorunits

class cl_bejing(region):
    pass

bj_controlscore = int(input("Enter this region's control score (int from 1-5): "))
bj_resourcetype = (input("Enter this region's resource type (int 1-3): "))
bj_city = bool(input("Does this region have a city/extra resource (bool)? "))
bj_infantryunits = list(input("Enter the number of infantry units in this region (int list: lv1, lv2, lv3, lv4): "))
bj_armorunits = list(input("Enter the number of infantry units in this region (int list: lv1, lv2, lv3, lv4): "))

bejing = cl_bejing(bj_controlscore, bj_resourcetype, bj_city, bj_infantryunits, bj_armorunits)
