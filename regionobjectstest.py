def safe_list_get (l, idx):
  try:
    return l[idx]
  except IndexError:
    return "error"

class region:
    #This is the parent class for all regions
    def __init__ (self, controlscore, resourcetype, city, infantryunits, armoredunits):  #This defines the variables when created
        self.controlscore = controlscore #Which nation controls the region
        self.resourcetype = resourcetype #Which resourse is present in the region
        self.city = city #Does the region have a city and therefore extra, changable resource
        self.infantryunits = infantryunits #How many infantry units are in the region and of what level
        self.armoredunits = armoredunits #How many armored units are in the region and of what level
    
    def getvariable(self): #Used to fetch one of the stored variables
        whichvar =list(input("Which variable would you like to check (int list: 1= Control Score, 2= Resource Type, 3= City, 4= Infantry Units, 5= Armored Units)? ")) #Asked which variable the operator wants to retrieve
        possiblevar = (self.controlscore, self.resourcetype, self.city, self.infantryunits, self.armoredunits)
        loopcounter = 0
        while loopcounter<5:
            if safe_list_get(whichvar,loopcounter)!=("error"):
               print(safe_list_get(possiblevar, (int(safe_list_get(whichvar,loopcounter))-(1))))
            
            loopcounter = loopcounter + 1
        if loopcounter == 5:
           loopcounter = 0
                

class cl_bejing(region): #Creating the bejing region
    pass 

#Defines all the child region variables via user input
bj_controlscore = 1 #int(input("Enter this region's control score (int from: 1-5): "))
bj_resourcetype = 1 #(input("Enter this region's resource type (int: 1-3): "))
bj_city = True #bool(input("This region have a city/extra resource (bool)? "))
bj_infantryunits = (0,1,3,2) #list(input("Enter the number of infantry units in this region (int list: lv1, lv2, lv3, lv4): "))
bj_armoredunits = (0,1,2,0) #list(input("Enter the number of armored units in this region (int list: lv1, lv2, lv3, lv4): "))

bejing = cl_bejing(bj_controlscore, bj_resourcetype, bj_city, bj_infantryunits, bj_armoredunits)

bejing.getvariable()
