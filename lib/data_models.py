class District():
  def __init__(self, name, json):
    self.name = name
    self.json = json
    
class School():
  def __init__(self,id,district,subcounty,name,use_status):
    self.id = id    
    self.district = district
    self.subcounty = subcounty
    self.name = name
    self.use_status = use_status
