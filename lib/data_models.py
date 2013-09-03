class District():
  def __init__(self, name, area, subregion, json):
    self.name = name
    self.area = area
    self.subregion = subregion
    self.json = json

  @property
  def serialize(self):   
    return {
      "name" : self.name,
      "area" : self.area,
      "subregion" : self.subregion
    }
    
class School():
  def __init__(self,id,district,subcounty,name,use_status):
    self.id = id    
    self.district = district
    self.subcounty = subcounty
    self.name = name
    self.use_status = use_status
